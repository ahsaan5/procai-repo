# ProcAI MVP - Working Demo Application

## Overview

This is a fully functional MVP simulation of ProcAI - an AI-powered customer support assistant for telecom call centers.

The system demonstrates:
- Real-time call transcription simulation
- AI-powered issue summarization
- Top 3 resolution recommendations with confidence scores
- Auto-filled CRM fields
- Customer data, billing, and network status retrieval
- Post-call feedback and metrics tracking

## Architecture

```
mvp/
├── backend/              # FastAPI Python backend
│   ├── app/
│   │   ├── main.py      # FastAPI application
│   │   ├── routes.py    # API endpoints
│   │   └── websocket.py # WebSocket for real-time updates
│   ├── models/
│   │   ├── llm_simulator.py  # Simulated AI logic
│   │   └── resolution_engine.py
│   ├── data/            # Data access layer
│   │   └── db.py
│   └── requirements.txt
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API client
│   │   └── App.jsx     # Main application
│   ├── package.json
│   └── public/
├── data/               # JSON data files
│   ├── customers.json
│   ├── billing.json
│   ├── tickets.json
│   ├── call_scripts.json
│   └── resolutions.json
└── README.md          # This file
```

## Prerequisites

- **Python 3.10+**
- **Node.js 16+** and npm
- **Git** (optional)

## Quick Start

### 1. Install Backend Dependencies

```bash
cd mvp/backend
pip install -r requirements.txt
```

### 2. Install Frontend Dependencies

```bash
cd mvp/frontend
npm install
```

### 3. Start the Backend Server

```bash
cd mvp/backend
python -m uvicorn app.main:app --reload --port 8000
```

The backend will run on `http://localhost:8000`

### 4. Start the Frontend Development Server

```bash
cd mvp/frontend
npm start
```

The frontend will run on `http://localhost:3000`

### 5. Open the Application

Navigate to `http://localhost:3000` in your web browser.

## Using the Demo

### Starting a Simulated Call

1. Click **"Start Demo Call"** button
2. Select a demo scenario (e.g., "Billing Dispute - John Smith")
3. Watch as the transcript streams in real-time
4. Observe AI recommendations updating as the conversation progresses

### Features to Explore

#### 1. Customer Profile Panel
- Auto-loads when call starts
- Shows account details, plan, device info
- Displays tenure and payment status

#### 2. Live Transcript
- Streams line-by-line to simulate real call
- Shows speaker labels (Customer/Agent)
- Sentiment indicators update in real-time

#### 3. AI Insights
- Issue category detection
- Sentiment analysis
- Urgency level calculation
- Key facts extraction

#### 4. Solution Recommendations
- Top 3 solutions ranked by confidence
- Detailed reasoning for each
- Step-by-step resolution guides
- Expected outcomes

#### 5. Auto-Fill CRM
- Ticket fields pre-populated
- Customer info auto-filled
- Resolution steps documented
- One-click save

#### 6. Metrics Dashboard
- Average Handle Time (AHT)
- First Call Resolution (FCR)
- Customer Satisfaction (CSAT)
- Solution accuracy

## API Endpoints

### Core Endpoints

```
GET  /api/health                    - Health check
GET  /api/customer/{customer_id}    - Get customer profile
GET  /api/billing/{customer_id}     - Get billing history
GET  /api/network/{zip_code}        - Get network status
GET  /api/tickets/{customer_id}     - Get ticket history
POST /api/summarize_call            - Summarize transcript chunk
POST /api/suggest_resolutions       - Get AI recommendations
POST /api/crm_autofill              - Get auto-filled ticket
POST /api/end_call_feedback         - Submit call feedback
GET  /api/metrics                   - Get dashboard metrics
```

### WebSocket Endpoint

```
WS   /ws/call/{call_id}             - Real-time call simulation
```

## Sample API Requests

### Get Customer Profile

```bash
curl http://localhost:8000/api/customer/TC-887234
```

Response:
```json
{
  "customer_id": "TC-887234",
  "name": "John Smith",
  "email": "john.smith@email.com",
  "phone": "(555) 234-8877",
  "plan": {
    "name": "Unlimited Plus",
    "monthly_cost": 89.99
  },
  "tenure_months": 38
}
```

### Get AI Recommendations

```bash
curl -X POST http://localhost:8000/api/suggest_resolutions \\
  -H "Content-Type: application/json" \\
  -d '{
    "transcript": "Customer complaining about high bill due to roaming charges",
    "customer_id": "TC-887234",
    "issue_category": "BILLING"
  }'
```

Response:
```json
{
  "solutions": [
    {
      "rank": 1,
      "title": "Roaming Charges Explanation + Courtesy Credit",
      "confidence": 92,
      "reasoning": "Customer has international roaming charges...",
      "steps": [
        "Explain roaming charges from Canada trip",
        "Offer 50% courtesy credit",
        "Educate on TravelPass option"
      ]
    }
  ]
}
```

## Demo Scenarios

The MVP includes 5 pre-configured demo scenarios:

1. **Billing Dispute (John Smith)**
   - Issue: Unexpected roaming charges
   - Duration: ~6 minutes
   - Expected outcome: Courtesy credit + education

2. **Network Outage (Maria Rodriguez)**
   - Issue: Complete service loss
   - Duration: ~8 minutes
   - Expected outcome: WiFi calling workaround

3. **SIM Activation (David Chen)**
   - Issue: New customer activation failing
   - Duration: ~12 minutes
   - Expected outcome: Manual activation success

4. **Device Support (Patricia Johnson)**
   - Issue: iPhone won't turn on after update
   - Duration: ~15 minutes
   - Expected outcome: Device restored

5. **Plan Upgrade (Marcus Williams)**
   - Issue: Need more hotspot data
   - Duration: ~10 minutes
   - Expected outcome: Successful upsell

## Simulated AI Logic

The MVP uses rule-based AI simulation instead of real LLMs:

### Issue Detection
- Keyword matching on transcript
- Pattern recognition for common issues
- Confidence scoring based on keyword density

### Sentiment Analysis
- Positive/negative word detection
- Sentiment score calculation (-1 to +1)
- Emotion classification (frustrated, satisfied, etc.)

### Solution Recommendations
- Database lookup based on issue category
- Confidence scoring based on pattern match
- Historical success rate simulation

### Auto-Fill Logic
- Template-based ticket generation
- Keyword extraction for summaries
- Customer data merge from profile

## Testing the MVP

### Run Backend Tests

```bash
cd mvp/backend
pytest
```

### Run Frontend Tests

```bash
cd mvp/frontend
npm test
```

### Manual Testing Checklist

- [ ] Start a demo call
- [ ] Verify customer profile loads
- [ ] Watch transcript stream
- [ ] Check AI insights update
- [ ] Review solution recommendations
- [ ] Test CRM auto-fill
- [ ] Submit end-call feedback
- [ ] View metrics dashboard
- [ ] Try all 5 demo scenarios

## Customization

### Adding New Demo Calls

Edit `data/call_scripts.json`:

```json
{
  "call_id": "CALL-NEW-001",
  "customer_id": "TC-XXXXXX",
  "transcript": [
    {
      "timestamp": "00:00:03",
      "speaker": "AGENT",
      "text": "Thank you for calling..."
    }
  ]
}
```

### Adding New Resolution Templates

Edit `data/resolutions.json`:

```json
{
  "resolution_id": "RES-NEW-001",
  "title": "Your Solution Title",
  "category": "BILLING",
  "confidence_base": 85,
  "steps": [...]
}
```

## Troubleshooting

### Backend Won't Start

```bash
# Check Python version
python --version  # Should be 3.10+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check port availability
lsof -i :8000
```

### Frontend Won't Start

```bash
# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Check port availability
lsof -i :3000
```

### WebSocket Connection Issues

- Ensure backend is running on port 8000
- Check browser console for errors
- Verify CORS settings in `backend/app/main.py`

## Performance Notes

This MVP is optimized for demonstration, not production:

- **Data Storage:** In-memory JSON (no database)
- **AI Logic:** Rule-based simulation (no real LLM)
- **Concurrency:** Single-user focused
- **Security:** No authentication (demo only)

## Production Considerations

To move from MVP to production:

1. **Replace simulated AI with real LLMs**
   - Integrate OpenAI API or similar
   - Add caching layer for responses
   - Implement fallback strategies

2. **Add proper database**
   - PostgreSQL for customer/billing data
   - Redis for real-time caching
   - Vector DB for semantic search

3. **Implement authentication**
   - Agent login system
   - Role-based access control
   - API key management

4. **Add real integrations**
   - CRM system (Salesforce, etc.)
   - Billing platform
   - Network status APIs
   - Call recording systems

5. **Scale infrastructure**
   - Load balancing
   - Horizontal scaling
   - WebSocket clustering
   - CDN for frontend

## License

This MVP is for demonstration purposes only.

## Support

For questions or issues:
- Check the documentation in `/docs`
- Review the source code comments
- See the original specification in `/CUSTOMER_DATA.md` and related files

---

**Built with:** Python (FastAPI), React, WebSockets, JSON
**Demo Ready:** Yes ✅
**Production Ready:** No - simulation only
