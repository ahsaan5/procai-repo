#!/bin/bash

# ProcAI MVP Build Script
# This script creates all necessary files for the working MVP

echo "🚀 Building ProcAI MVP..."

# Create remaining data files
echo "📊 Creating data files..."

# resolutions.json
cat > data/resolutions.json << 'EOF'
[
  {
    "resolution_id": "RES-BILL-001",
    "title": "Roaming Charges Explanation + Courtesy Credit",
    "category": "BILLING",
    "confidence_base": 85,
    "keywords": ["roaming", "international", "charges", "travel", "canada", "mexico", "bill", "high"],
    "reasoning": "Customer has international roaming charges from verified trip. Long-term customer with good payment history.",
    "steps": [
      "Explain roaming charges from trip dates",
      "Verify customer was unaware of charges",
      "Offer 50% courtesy credit",
      "Educate on TravelPass option ($10/day)"
    ],
    "expected_outcome": "Customer satisfaction high, issue resolved"
  },
  {
    "resolution_id": "RES-TECH-001",
    "title": "Enable WiFi Calling + Service Credit",
    "category": "TECHNICAL",
    "confidence_base": 90,
    "keywords": ["outage", "no service", "network", "tower", "down"],
    "reasoning": "Confirmed network outage in customer area. WiFi calling provides immediate workaround.",
    "steps": [
      "Confirm outage in customer's area",
      "Check if customer has WiFi access",
      "Guide WiFi calling setup",
      "Apply service disruption credit",
      "Set restoration notification"
    ],
    "expected_outcome": "Immediate workaround provided, customer can continue business"
  },
  {
    "resolution_id": "RES-ACT-001",
    "title": "Manual SIM Activation + APN Configuration",
    "category": "ACTIVATION",
    "confidence_base": 92,
    "keywords": ["activate", "sim", "new", "setup", "no service", "pixel", "android"],
    "reasoning": "New customer BYOD activation. Missing APN configuration is common issue.",
    "steps": [
      "Verify device IMEI compatibility",
      "Register SIM card in system",
      "Walk through APN setup (TelcoMax/wholesale)",
      "Test data and SMS",
      "Provide voicemail and app setup info"
    ],
    "expected_outcome": "Successful activation, positive first impression"
  },
  {
    "resolution_id": "RES-DEV-001",
    "title": "Force Restart + iCloud Backup Setup",
    "category": "DEVICE_SUPPORT",
    "confidence_base": 88,
    "keywords": ["iphone", "won't turn on", "black screen", "update", "ios"],
    "reasoning": "iPhone interrupted during iOS update. Force restart resolves 93% of cases.",
    "steps": [
      "Have customer plug in device",
      "Guide through force restart procedure",
      "Wait for update to complete",
      "Verify data integrity",
      "Set up iCloud backup for future protection"
    ],
    "expected_outcome": "Device restored, data intact, backup enabled"
  },
  {
    "resolution_id": "RES-SALES-001",
    "title": "Upgrade to Premium Plan with ROI Analysis",
    "category": "SALES",
    "confidence_base": 86,
    "keywords": ["upgrade", "hotspot", "limit", "data", "business", "travel"],
    "reasoning": "Business customer hitting hotspot limits. Premium plan offers better value with international benefits.",
    "steps": [
      "Analyze current usage patterns",
      "Present Plus and Premium options",
      "Calculate TravelPass savings for frequent travelers",
      "Demonstrate ROI of Premium vs Plus",
      "Process upgrade with prorated billing"
    ],
    "expected_outcome": "Successful upsell, customer needs met"
  }
]
EOF

# billing.json
cat > data/billing.json << 'EOF'
[
  {
    "customer_id": "TC-887234",
    "current_bill": {
      "amount": 156.43,
      "due_date": "2024-05-30",
      "status": "UNPAID",
      "breakdown": {
        "plan_charges": 89.99,
        "roaming_charges": 67.44,
        "taxes": -1.00
      }
    },
    "recent_bills": [
      {"date": "2024-04-15", "amount": 89.99, "status": "PAID"},
      {"date": "2024-03-15", "amount": 89.99, "status": "PAID"}
    ]
  },
  {
    "customer_id": "TC-923461",
    "current_bill": {
      "amount": 114.98,
      "due_date": "2024-05-30",
      "status": "UNPAID",
      "breakdown": {
        "plan_charges": 99.99,
        "device_protection": 14.99
      }
    },
    "recent_bills": [
      {"date": "2024-04-15", "amount": 114.98, "status": "PAID"}
    ]
  },
  {
    "customer_id": "TC-104529",
    "current_bill": {
      "amount": 65.00,
      "due_date": "2024-05-30",
      "status": "UNPAID",
      "breakdown": {
        "plan_charges": 65.00
      }
    },
    "recent_bills": []
  },
  {
    "customer_id": "TC-776234",
    "current_bill": {
      "amount": 101.98,
      "due_date": "2024-05-30",
      "status": "UNPAID",
      "breakdown": {
        "plan_charges": 89.99,
        "device_protection": 11.99
      }
    },
    "recent_bills": [
      {"date": "2024-04-15", "amount": 101.98, "status": "PAID"}
    ]
  },
  {
    "customer_id": "TC-334876",
    "current_bill": {
      "amount": 65.00,
      "due_date": "2024-05-30",
      "status": "UNPAID",
      "breakdown": {
        "plan_charges": 65.00
      }
    },
    "recent_bills": [
      {"date": "2024-04-15", "amount": 65.00, "status": "PAID"}
    ]
  }
]
EOF

# network_status.json
cat > data/network_status.json << 'EOF'
[
  {"zip": "10019", "status": "NORMAL", "message": "No issues reported", "speed": "145 Mbps"},
  {"zip": "90069", "status": "OUTAGE", "message": "Tower outage - power failure", "eta": "4:00 PM PST"},
  {"zip": "10016", "status": "NORMAL", "message": "No issues reported", "speed": "178 Mbps"},
  {"zip": "60614", "status": "NORMAL", "message": "No issues reported", "speed": "132 Mbps"},
  {"zip": "30309", "status": "NORMAL", "message": "No issues reported", "speed": "167 Mbps"}
]
EOF

# tickets.json
cat > data/tickets.json << 'EOF'
[
  {
    "customer_id": "TC-887234",
    "tickets": [
      {"ticket_id": "TKT-445821", "date": "2024-03-28", "category": "TECHNICAL", "status": "CLOSED", "summary": "Slow data speeds"}
    ]
  },
  {
    "customer_id": "TC-923461",
    "tickets": [
      {"ticket_id": "TKT-487632", "date": "2024-02-10", "category": "SALES", "status": "CLOSED", "summary": "Device purchase"}
    ]
  },
  {
    "customer_id": "TC-104529",
    "tickets": []
  },
  {
    "customer_id": "TC-776234",
    "tickets": [
      {"ticket_id": "TKT-665432", "date": "2024-01-18", "category": "TECHNICAL", "status": "CLOSED", "summary": "Email setup"}
    ]
  },
  {
    "customer_id": "TC-334876",
    "tickets": [
      {"ticket_id": "TKT-723456", "date": "2024-03-02", "category": "BILLING", "status": "CLOSED", "summary": "Update tax ID"}
    ]
  }
]
EOF

echo "✅ Data files created"

# Create backend Python files
echo "🐍 Creating backend files..."

mkdir -p backend/app backend/models

# main.py
cat > backend/app/main.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI(title="ProcAI MVP API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).parent.parent.parent / "data"

def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)

@app.get("/")
def root():
    return {"message": "ProcAI MVP API", "status": "running", "version": "1.0"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "data_loaded": True}

from app import routes
app.include_router(routes.router, prefix="/api")

from app import websocket_handler
app.include_router(websocket_handler.router)
EOF

# routes.py
cat > backend/app/routes.py << 'EOF'
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import json
from pathlib import Path

router = APIRouter()

DATA_DIR = Path(__file__).parent.parent.parent / "data"

def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)

@router.get("/customer/{customer_id}")
def get_customer(customer_id: str):
    customers = load_json("customers.json")
    customer = next((c for c in customers if c["customer_id"] == customer_id), None)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.get("/billing/{customer_id}")
def get_billing(customer_id: str):
    billing_data = load_json("billing.json")
    bill = next((b for b in billing_data if b["customer_id"] == customer_id), None)
    if not bill:
        return {"customer_id": customer_id, "current_bill": {"amount": 0}, "recent_bills": []}
    return bill

@router.get("/network/{zip_code}")
def get_network_status(zip_code: str):
    network_data = load_json("network_status.json")
    status = next((n for n in network_data if n["zip"] == zip_code), None)
    if not status:
        return {"status": "NORMAL", "message": "No issues reported", "speed": "100 Mbps"}
    return status

@router.get("/tickets/{customer_id}")
def get_tickets(customer_id: str):
    tickets_data = load_json("tickets.json")
    customer_tickets = next((t for t in tickets_data if t["customer_id"] == customer_id), None)
    if not customer_tickets:
        return []
    return customer_tickets.get("tickets", [])

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
    return get_recommendations(request.transcript, request.customer_id, request.issue_category)

class AutoFillRequest(BaseModel):
    call_id: str
    customer_id: str
    transcript: str
    resolution_applied: Optional[dict] = None

@router.post("/crm_autofill")
def crm_autofill(request: AutoFillRequest):
    from models.llm_simulator import generate_ticket
    return generate_ticket(request.call_id, request.customer_id, request.transcript, request.resolution_applied)

class FeedbackRequest(BaseModel):
    call_id: str
    customer_id: str
    aht_seconds: int
    customer_satisfied: bool
    agent_notes: Optional[str] = None
    resolution_successful: bool

@router.post("/end_call_feedback")
def end_call_feedback(request: FeedbackRequest):
    return {"status": "saved", "call_id": request.call_id, "metrics_updated": True}

@router.get("/metrics")
def get_metrics():
    return {
        "aht": {"current": 430, "baseline": 640, "improvement_percent": 32.8},
        "fcr": {"current": 87, "baseline": 68, "improvement_points": 19},
        "csat": {"current": 92, "baseline": 78, "improvement_points": 14},
        "solution_accuracy": 87,
        "agent_adoption": 78
    }
EOF

# websocket_handler.py
cat > backend/app/websocket_handler.py << 'EOF'
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
        call_scripts = load_json("call_scripts.json")
        script = next((s for s in call_scripts if s["call_id"] == call_id), None)

        if not script:
            await websocket.send_json({"error": "Call script not found"})
            await websocket.close()
            return

        for line in script["transcript"]:
            await asyncio.sleep(line.get("delay", 2))
            await websocket.send_json({"type": "transcript_line", "data": line})

        await websocket.send_json({"type": "call_end", "call_id": call_id})

    except WebSocketDisconnect:
        print(f"Client disconnected from call {call_id}")
    except Exception as e:
        print(f"Error in WebSocket: {e}")
        await websocket.close()
EOF

# llm_simulator.py
cat > backend/models/llm_simulator.py << 'EOF'
import re
from typing import Optional

def generate_summary(transcript: str, customer_id: Optional[str] = None):
    transcript_lower = transcript.lower()

    issue_category = "GENERAL"
    if any(word in transcript_lower for word in ["bill", "charge", "payment", "invoice", "roaming"]):
        issue_category = "BILLING"
    elif any(word in transcript_lower for word in ["service", "outage", "network", "signal", "tower"]):
        issue_category = "TECHNICAL"
    elif any(word in transcript_lower for word in ["upgrade", "plan", "change", "hotspot"]):
        issue_category = "SALES"
    elif any(word in transcript_lower for word in ["device", "phone", "iphone", "android", "turn on", "activate"]):
        issue_category = "DEVICE_SUPPORT"

    negative_words = ["frustrated", "angry", "upset", "terrible", "awful", "worst", "ridiculous", "unacceptable"]
    positive_words = ["great", "thank", "appreciate", "helpful", "excellent", "perfect"]

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

    urgency_keywords = ["urgent", "immediately", "right now", "asap", "emergency", "major problem"]
    urgency_level = "HIGH" if any(word in transcript_lower for word in urgency_keywords) else "MEDIUM"
    urgency_score = 0.85 if urgency_level == "HIGH" else 0.55

    key_facts = []
    amounts = re.findall(r'\$\d+(?:\.\d{2})?', transcript)
    for amount in amounts[:3]:
        key_facts.append(f"Amount mentioned: {amount}")

    phones = re.findall(r'\d{3}-\d{3}-\d{4}', transcript)
    for phone in phones[:2]:
        key_facts.append(f"Phone: {phone}")

    return {
        "issue_category": issue_category,
        "sentiment": sentiment,
        "sentiment_score": sentiment_score,
        "urgency_level": urgency_level,
        "urgency_score": urgency_score,
        "key_facts": key_facts[:5],
        "confidence": 0.94
    }

def generate_ticket(call_id: str, customer_id: str, transcript: str, resolution_applied: Optional[dict]):
    summary_data = generate_summary(transcript, customer_id)
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
EOF

# resolution_engine.py
cat > backend/models/resolution_engine.py << 'EOF'
import json
from pathlib import Path
from typing import List, Dict, Optional

DATA_DIR = Path(__file__).parent.parent.parent / "data"

def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)

def get_recommendations(transcript: str, customer_id: str, issue_category: Optional[str] = None) -> Dict:
    resolutions = load_json("resolutions.json")

    if not issue_category:
        from models.llm_simulator import generate_summary
        summary = generate_summary(transcript)
        issue_category = summary["issue_category"]

    matching = [r for r in resolutions if r.get("category") == issue_category]

    if not matching:
        matching = resolutions[:3]

    transcript_lower = transcript.lower()

    for resolution in matching:
        keywords = resolution.get("keywords", [])
        match_count = sum(1 for kw in keywords if kw.lower() in transcript_lower)
        keyword_score = (match_count / len(keywords)) * 100 if keywords else 50

        base_confidence = resolution.get("confidence_base", 70)
        resolution["confidence"] = int((base_confidence + keyword_score) / 2)

    sorted_resolutions = sorted(matching, key=lambda x: x["confidence"], reverse=True)[:3]

    for idx, res in enumerate(sorted_resolutions):
        res["rank"] = idx + 1

    return {"solutions": sorted_resolutions, "issue_category": issue_category}
EOF

echo "✅ Backend files created"

echo ""
echo "✨ Build complete!"
echo ""
echo "Next steps:"
echo "1. cd backend && pip install -r requirements.txt"
echo "2. python -m uvicorn app.main:app --reload --port 8000"
echo ""
echo "Then in another terminal:"
echo "3. cd frontend && npm install"
echo "4. npm start"
echo ""
echo "🎉 MVP ready for development!"
