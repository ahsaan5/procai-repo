# ProcAI MVP - How to Run the Demo

## Prerequisites
✅ All dependencies installed
✅ Backend ready (FastAPI + Python)
✅ Frontend ready (React)

## Quick Start

### Option 1: Run with Scripts (Easiest)

**Terminal 1 - Start Backend:**
```bash
cd /Users/ahsaanrizvi/Projects_Cursor/procai/mvp
chmod +x start_backend.sh
./start_backend.sh
```

**Terminal 2 - Start Frontend:**
```bash
cd /Users/ahsaanrizvi/Projects_Cursor/procai/mvp
chmod +x start_frontend.sh
./start_frontend.sh
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd /Users/ahsaanrizvi/Projects_Cursor/procai/mvp/backend
python -m uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd /Users/ahsaanrizvi/Projects_Cursor/procai/mvp/frontend
npm start
```

## What You'll See

1. **Backend** starts on: `http://localhost:8000`
   - API docs at: `http://localhost:8000/docs`

2. **Frontend** starts on: `http://localhost:3000`
   - Dashboard UI opens automatically in your browser

## Using the Demo

1. Click **"Start Demo Call"** button
2. Select a call scenario:
   - **Call 1**: Billing Dispute (John Smith)
   - **Call 2**: Network Outage (Maria Rodriguez)

3. Watch the simulation:
   - ✅ Customer profile loads
   - ✅ Transcript streams line-by-line
   - ✅ AI insights update in real-time
   - ✅ Solution recommendations appear
   - ✅ Metrics update (AHT, FCR, CSAT)

4. When call ends:
   - Auto-filled ticket modal appears
   - Save ticket to complete workflow

## Troubleshooting

### Backend Won't Start
```bash
# Check Python version
python --version  # Should be 3.7+

# Reinstall dependencies
cd backend
pip install -r requirements.txt
```

### Frontend Won't Start
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Backend on different port
python -m uvicorn app.main:app --reload --port 8001

# Update frontend API URL in src/services/api.js
```

### WebSocket Connection Fails
- Ensure backend is running first
- Check browser console for errors
- Verify CORS settings in backend/app/main.py

## API Endpoints

Test the API directly:

```bash
# Get customer info
curl http://localhost:8000/api/customer/TC-887234

# List all demo calls
curl http://localhost:8000/api/call_scripts

# Get AI summary (POST)
curl -X POST http://localhost:8000/api/summarize_call \
  -H "Content-Type: application/json" \
  -d '{"transcript":"Customer is frustrated about billing","customer_id":"TC-887234"}'
```

## File Structure

```
mvp/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app
│   │   ├── routes.py            # API endpoints
│   │   └── websocket_handler.py # WebSocket streaming
│   └── models/
│       ├── llm_simulator.py     # AI simulation
│       └── resolution_engine.py # Solution suggestions
├── frontend/
│   ├── src/
│   │   ├── App.js              # Main app
│   │   ├── components/         # React components
│   │   └── services/api.js     # API client
│   └── public/
└── data/
    ├── customers.json          # Customer profiles
    ├── call_scripts.json       # Call transcripts
    ├── resolutions.json        # Solution templates
    ├── billing.json            # Billing data
    ├── tickets.json            # Ticket history
    └── network_status.json     # Network info
```

## Demo Scenarios

### Call 1: Billing Dispute - Roaming Charges
- Customer: John Smith (TC-887234)
- Duration: 392 seconds
- Issue: Unexpected $67 international roaming charges
- Resolution: 50% courtesy credit applied
- Outcome: Customer satisfied, educated on TravelPass

### Call 2: Network Outage
- Customer: Maria Rodriguez (TC-923461)
- Duration: 485 seconds
- Issue: No service for 3+ hours, work disruption
- Resolution: WiFi calling enabled, $35 credit applied
- Outcome: Immediate workaround provided

## What's Simulated

This MVP simulates a real AI-powered support system:

- ❌ **Not Real**: LLM API calls (uses keyword matching)
- ❌ **Not Real**: Database (uses JSON files)
- ❌ **Not Real**: Voice transcription (pre-scripted)
- ✅ **Real**: UI/UX workflow
- ✅ **Real**: WebSocket communication
- ✅ **Real**: API structure
- ✅ **Real**: Component architecture

## Next Steps

1. Test both call scenarios
2. Review AI insights accuracy
3. Check solution recommendations
4. Verify auto-filled tickets
5. Analyze metrics dashboard
6. Record demo video

## Need Help?

- Backend API docs: http://localhost:8000/docs
- Check browser console for frontend errors
- Check terminal for backend errors
- Review IMPLEMENTATION_GUIDE.md for code details

---

**Ready to demo!** 🎉

Start both servers and open http://localhost:3000
