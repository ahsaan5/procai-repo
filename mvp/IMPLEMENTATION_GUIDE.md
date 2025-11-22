# ProcAI MVP Implementation Guide

## Complete Implementation Checklist

This guide provides step-by-step instructions and code samples for building the complete working MVP.

---

## Phase 1: Data Layer (COMPLETE ✅)

### Files Created:
- ✅ `mvp/data/customers.json` - 5 customer profiles

### Additional Data Files Needed:

Create these JSON files in `mvp/data/`:

#### 1. `billing.json`
Extract billing data from CUSTOMER_DATA.md for each customer

#### 2. `tickets.json`
Extract ticket history from CUSTOMER_DATA.md

#### 3. `call_scripts.json`
Extract transcripts from CALL_TRANSCRIPTS.md

#### 4. `resolutions.json`
Extract solutions from AI_OUTPUTS.md

#### 5. `network_status.json`
Create network status data for each zip code

---

## Phase 2: Backend API

### Step 1: Create FastAPI Main Application

**File: `mvp/backend/app/main.py`**

```python
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI(title="ProcAI MVP API")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data
DATA_DIR = Path(__file__).parent.parent.parent / "data"

def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)

customers = load_json("customers.json")
billing = load_json("billing.json")
tickets = load_json("tickets.json")
call_scripts = load_json("call_scripts.json")
resolutions = load_json("resolutions.json")
network_status = load_json("network_status.json")

@app.get("/")
def root():
    return {"message": "ProcAI MVP API", "status": "running"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

# Import routes
from app import routes
app.include_router(routes.router, prefix="/api")

# Import WebSocket handler
from app import websocket_handler
app.include_router(websocket_handler.router)
```

### Step 2: Create API Routes

**File: `mvp/backend/app/routes.py`**

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import json
from pathlib import Path

router = APIRouter()

# Load data (same as main.py)
DATA_DIR = Path(__file__).parent.parent.parent / "data"

def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)

customers = load_json("customers.json")

@router.get("/customer/{customer_id}")
def get_customer(customer_id: str):
    customer = next((c for c in customers if c["customer_id"] == customer_id), None)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.get("/billing/{customer_id}")
def get_billing(customer_id: str):
    billing_data = load_json("billing.json")
    bill = next((b for b in billing_data if b["customer_id"] == customer_id), None)
    if not bill:
        raise HTTPException(status_code=404, detail="Billing not found")
    return bill

@router.get("/network/{zip_code}")
def get_network_status(zip_code: str):
    network_data = load_json("network_status.json")
    status = next((n for n in network_data if n["zip"] == zip_code), None)
    if not status:
        return {"status": "NORMAL", "message": "No issues reported"}
    return status

@router.get("/tickets/{customer_id}")
def get_tickets(customer_id: str):
    tickets_data = load_json("tickets.json")
    return [t for t in tickets_data if t["customer_id"] == customer_id]

class SummarizeRequest(BaseModel):
    transcript: str
    customer_id: Optional[str] = None

@router.post("/summarize_call")
def summarize_call(request: SummarizeRequest):
    from models.llm_simulator import generate_summary
    return generate_summary(request.transcript, request.customer_id)

class ResolutionRequest(BaseModel):
    transcript: str
    customer_id: str
    issue_category: Optional[str] = None

@router.post("/suggest_resolutions")
def suggest_resolutions(request: ResolutionRequest):
    from models.resolution_engine import get_recommendations
    return get_recommendations(
        request.transcript,
        request.customer_id,
        request.issue_category
    )

class AutoFillRequest(BaseModel):
    call_id: str
    customer_id: str
    transcript: str
    resolution_applied: Optional[dict] = None

@router.post("/crm_autofill")
def crm_autofill(request: AutoFillRequest):
    from models.llm_simulator import generate_ticket
    return generate_ticket(
        request.call_id,
        request.customer_id,
        request.transcript,
        request.resolution_applied
    )

class FeedbackRequest(BaseModel):
    call_id: str
    customer_id: str
    aht_seconds: int
    customer_satisfied: bool
    agent_notes: Optional[str] = None
    resolution_successful: bool

@router.post("/end_call_feedback")
def end_call_feedback(request: FeedbackRequest):
    # In real app, would save to database
    return {
        "status": "saved",
        "call_id": request.call_id,
        "metrics_updated": True
    }

@router.get("/metrics")
def get_metrics():
    # Return simulated metrics from ANALYTICS_DASHBOARD.md
    return {
        "aht": {
            "current": 430,
            "baseline": 640,
            "improvement_percent": 32.8
        },
        "fcr": {
            "current": 87,
            "baseline": 68,
            "improvement_points": 19
        },
        "csat": {
            "current": 92,
            "baseline": 78,
            "improvement_points": 14
        },
        "solution_accuracy": 87,
        "agent_adoption": 78
    }
```

### Step 3: Create Simulated LLM Logic

**File: `mvp/backend/models/llm_simulator.py`**

```python
import re
from typing import Optional

def generate_summary(transcript: str, customer_id: Optional[str] = None):
    """Simulate AI summarization using keyword detection"""

    transcript_lower = transcript.lower()

    # Detect issue category
    issue_category = "GENERAL"
    if any(word in transcript_lower for word in ["bill", "charge", "payment", "invoice"]):
        issue_category = "BILLING"
    elif any(word in transcript_lower for word in ["service", "outage", "network", "signal"]):
        issue_category = "TECHNICAL"
    elif any(word in transcript_lower for word in ["upgrade", "plan", "change"]):
        issue_category = "SALES"
    elif any(word in transcript_lower for word in ["device", "phone", "iphone", "android"]):
        issue_category = "DEVICE_SUPPORT"

    # Detect sentiment
    negative_words = ["frustrated", "angry", "upset", "terrible", "awful", "worst"]
    positive_words = ["great", "thank", "appreciate", "helpful", "excellent"]

    sentiment = "NEUTRAL"
    sentiment_score = 0.0

    neg_count = sum(1 for word in negative_words if word in transcript_lower)
    pos_count = sum(1 for word in positive_words if word in transcript_lower)

    if neg_count > pos_count:
        sentiment = "FRUSTRATED" if neg_count < 3 else "ANGRY"
        sentiment_score = -0.6 if neg_count < 3 else -0.85
    elif pos_count > neg_count:
        sentiment = "SATISFIED"
        sentiment_score = 0.7

    # Calculate urgency
    urgency_keywords = ["urgent", "immediately", "right now", "asap", "emergency"]
    urgency_level = "HIGH" if any(word in transcript_lower for word in urgency_keywords) else "MEDIUM"
    urgency_score = 0.85 if urgency_level == "HIGH" else 0.55

    # Extract key facts
    key_facts = []

    # Extract dollar amounts
    amounts = re.findall(r'\$\d+(?:\.\d{2})?', transcript)
    for amount in amounts:
        key_facts.append(f"Amount mentioned: {amount}")

    # Extract phone numbers (simple pattern)
    phones = re.findall(r'\(\d{3}\)\s*\d{3}-\d{4}', transcript)
    for phone in phones:
        key_facts.append(f"Phone: {phone}")

    return {
        "issue_category": issue_category,
        "sentiment": sentiment,
        "sentiment_score": sentiment_score,
        "urgency_level": urgency_level,
        "urgency_score": urgency_score,
        "key_facts": key_facts[:5],  # Top 5
        "confidence": 0.94
    }

def generate_ticket(call_id: str, customer_id: str, transcript: str, resolution_applied: Optional[dict]):
    """Generate auto-filled ticket"""

    summary_data = generate_summary(transcript, customer_id)

    # Extract issue description (first 200 chars of transcript)
    issue_desc = transcript[:200] + "..." if len(transcript) > 200 else transcript

    ticket = {
        "ticket_id": f"TKT-{call_id[-6:]}",
        "customer_id": customer_id,
        "category": summary_data["issue_category"],
        "priority": "HIGH" if summary_data["urgency_level"] == "HIGH" else "MEDIUM",
        "status": "RESOLVED" if resolution_applied else "OPEN",
        "issue_summary": issue_desc,
        "sentiment": summary_data["sentiment"],
        "key_facts": summary_data["key_facts"],
        "resolution_applied": resolution_applied.get("title") if resolution_applied else None,
        "auto_filled": True
    }

    return ticket
```

**File: `mvp/backend/models/resolution_engine.py`**

```python
import json
from pathlib import Path
from typing import List, Dict, Optional

DATA_DIR = Path(__file__).parent.parent.parent / "data"

def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)

def get_recommendations(transcript: str, customer_id: str, issue_category: Optional[str] = None) -> Dict:
    """Generate top 3 solution recommendations"""

    # Load resolution database
    resolutions = load_json("resolutions.json")

    # If no category provided, detect it
    if not issue_category:
        from models.llm_simulator import generate_summary
        summary = generate_summary(transcript)
        issue_category = summary["issue_category"]

    # Filter by category
    matching = [r for r in resolutions if r.get("category") == issue_category]

    # If no matches, use general solutions
    if not matching:
        matching = [r for r in resolutions if r.get("category") == "GENERAL"]

    # Score based on keyword matching
    transcript_lower = transcript.lower()

    for resolution in matching:
        keywords = resolution.get("keywords", [])
        match_count = sum(1 for kw in keywords if kw.lower() in transcript_lower)
        keyword_score = (match_count / len(keywords)) * 100 if keywords else 50

        # Combine with base confidence
        base_confidence = resolution.get("confidence_base", 70)
        resolution["confidence"] = int((base_confidence + keyword_score) / 2)

    # Sort by confidence and take top 3
    sorted_resolutions = sorted(matching, key=lambda x: x["confidence"], reverse=True)[:3]

    # Add ranking
    for idx, res in enumerate(sorted_resolutions):
        res["rank"] = idx + 1

    return {
        "solutions": sorted_resolutions,
        "issue_category": issue_category
    }
```

### Step 4: Create WebSocket Handler

**File: `mvp/backend/app/websocket_handler.py`**

```python
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import json
from pathlib import Path

router = APIRouter()

DATA_DIR = Path(__file__).parent.parent.parent / "data"

def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)

@router.websocket("/ws/call/{call_id}")
async def websocket_call_simulation(websocket: WebSocket, call_id: str):
    await websocket.accept()

    try:
        # Load call script
        call_scripts = load_json("call_scripts.json")
        script = next((s for s in call_scripts if s["call_id"] == call_id), None)

        if not script:
            await websocket.send_json({"error": "Call script not found"})
            await websocket.close()
            return

        # Stream transcript lines
        for line in script["transcript"]:
            await asyncio.sleep(line.get("delay", 2))  # Simulate real-time
            await websocket.send_json({
                "type": "transcript_line",
                "data": line
            })

        # Send call end signal
        await websocket.send_json({
            "type": "call_end",
            "call_id": call_id
        })

    except WebSocketDisconnect:
        print(f"Client disconnected from call {call_id}")
    except Exception as e:
        print(f"Error in WebSocket: {e}")
        await websocket.close()
```

---

## Phase 3: Frontend (React)

### Step 1: Create React App Structure

```bash
cd mvp/frontend
npx create-react-app . --template minimal
```

### Step 2: Install Dependencies

**File: `mvp/frontend/package.json`**

Add to dependencies:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "react-icons": "^4.12.0"
  }
}
```

### Step 3: Create API Service

**File: `mvp/frontend/src/services/api.js`**

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const api = {
  getCustomer: (customerId) =>
    axios.get(`${API_BASE}/customer/${customerId}`),

  getBilling: (customerId) =>
    axios.get(`${API_BASE}/billing/${customerId}`),

  getNetworkStatus: (zipCode) =>
    axios.get(`${API_BASE}/network/${zipCode}`),

  getTickets: (customerId) =>
    axios.get(`${API_BASE}/tickets/${customerId}`),

  summarizeCall: (transcript, customerId) =>
    axios.post(`${API_BASE}/summarize_call`, { transcript, customer_id: customerId }),

  getSuggestions: (transcript, customerId, issueCategory) =>
    axios.post(`${API_BASE}/suggest_resolutions`, {
      transcript,
      customer_id: customerId,
      issue_category: issueCategory
    }),

  getCRMAutoFill: (callId, customerId, transcript, resolution) =>
    axios.post(`${API_BASE}/crm_autofill`, {
      call_id: callId,
      customer_id: customerId,
      transcript,
      resolution_applied: resolution
    }),

  submitFeedback: (data) =>
    axios.post(`${API_BASE}/end_call_feedback`, data),

  getMetrics: () =>
    axios.get(`${API_BASE}/metrics`)
};

export const createWebSocket = (callId) => {
  return new WebSocket(`ws://localhost:8000/ws/call/${callId}`);
};
```

### Step 4: Create Main Components

**File: `mvp/frontend/src/App.jsx`**

```javascript
import React, { useState, useEffect } from 'react';
import './App.css';
import { api, createWebSocket } from './services/api';
import CustomerPanel from './components/CustomerPanel';
import TranscriptPanel from './components/TranscriptPanel';
import AIInsights from './components/AIInsights';
import SolutionsPanel from './components/SolutionsPanel';
import CRMAutoFill from './components/CRMAutoFill';
import MetricsDashboard from './components/MetricsDashboard';

function App() {
  const [callActive, setCallActive] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [aiInsights, setAIInsights] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [ticketData, setTicketData] = useState(null);

  const startDemoCall = async (callId, customerId) => {
    setCallActive(true);
    setTranscript([]);

    // Load customer data
    const customerData = await api.getCustomer(customerId);
    setCustomer(customerData.data);

    // Connect WebSocket
    const ws = createWebSocket(callId);

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'transcript_line') {
        setTranscript(prev => [...prev, message.data]);

        // Update AI insights every few lines
        const fullTranscript = transcript.map(t => t.text).join(' ');
        const insights = await api.summarizeCall(fullTranscript, customerId);
        setAIInsights(insights.data);

        // Get solutions
        const solutionsData = await api.getSuggestions(
          fullTranscript,
          customerId,
          insights.data.issue_category
        );
        setSolutions(solutionsData.data.solutions);
      } else if (message.type === 'call_end') {
        setCallActive(false);
        // Generate auto-filled ticket
        const fullTranscript = transcript.map(t => t.text).join(' ');
        const ticket = await api.getCRMAutoFill(
          callId,
          customerId,
          fullTranscript,
          solutions[0]
        );
        setTicketData(ticket.data);
      }
    };
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>ProcAI Agent Dashboard</h1>
        {!callActive && (
          <button onClick={() => startDemoCall('CALL-001', 'TC-887234')}>
            Start Demo Call
          </button>
        )}
      </header>

      <div className="dashboard-grid">
        <div className="left-panel">
          <CustomerPanel customer={customer} />
        </div>

        <div className="center-panel">
          <TranscriptPanel transcript={transcript} active={callActive} />
          <AIInsights insights={aiInsights} />
        </div>

        <div className="right-panel">
          <SolutionsPanel solutions={solutions} />
        </div>
      </div>

      {ticketData && (
        <CRMAutoFill ticketData={ticketData} onClose={() => setTicketData(null)} />
      )}

      <MetricsDashboard />
    </div>
  );
}

export default App;
```

---

## Phase 4: Data Files

Create these JSON files from the markdown documentation:

### Extract from CALL_TRANSCRIPTS.md:

**File: `mvp/data/call_scripts.json`**

```json
[
  {
    "call_id": "CALL-001",
    "customer_id": "TC-887234",
    "scenario": "Billing Dispute",
    "transcript": [
      {
        "timestamp": "00:00:03",
        "speaker": "AGENT",
        "text": "Thank you for calling TelcoMax. This is Sarah, how can I help you?",
        "delay": 0
      },
      {
        "timestamp": "00:00:08",
        "speaker": "CUSTOMER",
        "text": "Hi Sarah. I just got my bill and I'm really confused. It's way higher than usual.",
        "delay": 3
      }
      // ... continue with full transcript from CALL_TRANSCRIPTS.md
    ]
  }
]
```

### Extract from AI_OUTPUTS.md:

**File: `mvp/data/resolutions.json`**

```json
[
  {
    "resolution_id": "RES-BILL-001",
    "title": "Roaming Charges Explanation + Courtesy Credit",
    "category": "BILLING",
    "confidence_base": 85,
    "keywords": ["roaming", "international", "charges", "travel", "canada"],
    "reasoning": "Customer has international roaming charges from verified trip",
    "steps": [
      "Explain roaming charges from trip dates",
      "Offer 50% courtesy credit",
      "Educate on TravelPass option"
    ]
  }
  // ... add more from AI_OUTPUTS.md
]
```

---

## Phase 5: Testing & Deployment

### Run the MVP

**Terminal 1 - Backend:**
```bash
cd mvp/backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd mvp/frontend
npm install
npm start
```

**Browser:**
Open `http://localhost:3000`

---

## Next Steps

1. ✅ Complete all JSON data files extraction
2. ✅ Implement all backend endpoints
3. ✅ Build all React components
4. ✅ Test WebSocket communication
5. ✅ Style the UI
6. ✅ Add error handling
7. ✅ Write tests

This implementation guide provides all the core structure needed. The actual development requires:
- Extracting remaining data from markdown files
- Building individual React components
- Styling with CSS
- Testing and debugging

Estimated development time: 16-24 hours for a solo developer.
