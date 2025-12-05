# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ProcAI** is an AI-powered customer support assistant for telecom companies. This repository contains a fully functional MVP simulation with a FastAPI backend and React frontend demonstrating real-time call transcription, AI-powered issue analysis, and solution recommendations.

## Project Structure

```
procai/
├── mvp/                          # Main MVP application
│   ├── backend/                  # FastAPI Python backend
│   │   ├── app/
│   │   │   ├── main.py          # FastAPI application entry point
│   │   │   ├── routes.py        # API endpoints
│   │   │   └── websocket_handler.py  # WebSocket for real-time transcript streaming
│   │   ├── models/
│   │   │   ├── llm_simulator.py      # AI logic simulation (keyword-based)
│   │   │   └── resolution_engine.py  # Solution recommendation engine
│   │   └── requirements.txt          # Python dependencies
│   ├── frontend/                # React frontend
│   │   ├── src/
│   │   │   ├── App.js           # Main application component
│   │   │   ├── App.css          # Application styles
│   │   │   ├── components/      # React components
│   │   │   └── services/        # API client
│   │   └── package.json         # Node dependencies
│   ├── data/                    # JSON data files (simulated database)
│   │   ├── customers.json       # 5 customer profiles
│   │   ├── call_scripts.json    # 5 call transcripts with timing
│   │   ├── resolutions.json     # AI solution templates
│   │   ├── billing.json         # Billing data
│   │   ├── network_status.json  # Network status by zip
│   │   └── tickets.json         # Historical tickets
│   ├── build_mvp.sh            # Script to build all data files
│   ├── start_backend.sh        # Start backend server
│   └── start_frontend.sh       # Start frontend dev server
├── *.md files                   # Documentation and simulation plans
└── logo.png                     # Project logo
```

## Development Workflow

### Starting the Application

**Backend (Terminal 1):**
```bash
cd mvp/backend
pip install -r requirements.txt  # First time only
python -m uvicorn app.main:app --reload --port 8000
```

**Frontend (Terminal 2):**
```bash
cd mvp/frontend
npm install  # First time only
npm start
```

**Access:** Frontend runs on `http://localhost:3000`, Backend API on `http://localhost:8000`

### Running Quick Start Scripts

```bash
cd mvp
./start_backend.sh    # Starts backend on port 8000
./start_frontend.sh   # Starts frontend on port 3000
```

## Architecture Overview

### Backend (FastAPI)

**Key Files:**
- `backend/app/main.py`: FastAPI app initialization, CORS, route registration
- `backend/app/routes.py`: REST API endpoints (customer, billing, network, AI analysis)
- `backend/app/websocket_handler.py`: WebSocket `/ws/call/{call_id}` for streaming transcripts
- `backend/models/llm_simulator.py`: Simulated AI using keyword matching (no real LLM)
- `backend/models/resolution_engine.py`: Matches transcripts to solution templates

**Data Loading Pattern:**
All backend modules load JSON data using:
```python
DATA_DIR = Path(__file__).parent.parent.parent / "data"
def load_json(filename):
    with open(DATA_DIR / filename) as f:
        return json.load(f)
```

### Frontend (React)

**Key Files:**
- `frontend/src/App.js`: Main application logic, WebSocket management, state handling
- `frontend/src/App.css`: All styling (including transcript scrolling fix at lines 246-258)
- `frontend/src/services/api.js`: Axios-based API client for backend communication
- `frontend/src/components/`: UI components for customer panel, transcript, AI insights, solutions

**Critical Implementation Note:**
The Live Transcript panel uses fixed 400px height with `overflow-y: auto` (App.css lines 246-258) to enable scrolling for long conversations.

### WebSocket Flow

1. User clicks "Start Demo Call" → Frontend connects to `/ws/call/{call_id}`
2. Backend loads call script from `data/call_scripts.json`
3. Backend streams transcript lines with delays: `{"type": "transcript_line", "data": {...}}`
4. Frontend accumulates lines, periodically calls `/api/summarize_call` and `/api/suggest_resolutions`
5. Call ends: Backend sends `{"type": "call_end", "call_id": "..."}`
6. Frontend calls `/api/crm_autofill` to generate ticket

## Key API Endpoints

```
GET  /api/health                      # Health check
GET  /api/customer/{customer_id}      # Get customer profile
GET  /api/billing/{customer_id}       # Get billing history
GET  /api/network/{zip_code}          # Get network status
GET  /api/tickets/{customer_id}       # Get ticket history
POST /api/summarize_call              # AI issue detection & sentiment
POST /api/suggest_resolutions         # Get top 3 AI solutions
POST /api/crm_autofill                # Generate auto-filled ticket
POST /api/end_call_feedback           # Submit call metrics
GET  /api/metrics                     # Dashboard KPIs
WS   /ws/call/{call_id}              # Real-time transcript stream
```

## Data Files Structure

### customers.json
Contains 5 customer profiles (TC-887234, TC-923461, TC-104529, TC-776234, TC-334876) with account details, plan info, device data, and address.

### call_scripts.json
5 complete call transcripts with:
- `call_id`: CALL-001 through CALL-005
- `customer_id`: Links to customer
- `scenario`: Issue description
- `transcript`: Array of `{timestamp, speaker, text, delay}` objects

The `delay` field controls WebSocket streaming speed (seconds between messages).

### resolutions.json
Solution templates with:
- `resolution_id`, `title`, `category` (BILLING, TECHNICAL, SALES, etc.)
- `confidence_base`: Base confidence score
- `keywords`: Array for transcript matching
- `reasoning`, `steps`, `expected_outcome`

## AI Simulation Logic

**This MVP does NOT use real LLMs.** All AI is simulated using:

1. **Issue Detection** (`llm_simulator.py`): Keyword matching (e.g., "bill" → BILLING, "outage" → TECHNICAL)
2. **Sentiment Analysis**: Count negative words ("frustrated", "angry") vs positive words
3. **Solution Matching** (`resolution_engine.py`): Match keywords in transcript to `resolutions.json` keywords, combine with base confidence
4. **Ticket Generation**: Template-based with extracted facts (dollar amounts, phone numbers)

## Common Development Tasks

### Adding a New Demo Call

1. Edit `mvp/data/call_scripts.json`:
```json
{
  "call_id": "CALL-006",
  "customer_id": "TC-887234",
  "scenario": "Your scenario",
  "transcript": [
    {"timestamp": "00:00:00", "speaker": "AGENT", "text": "...", "delay": 2}
  ]
}
```

2. No code changes needed—restart backend to load new data.

### Adding a New Solution Template

1. Edit `mvp/data/resolutions.json`:
```json
{
  "resolution_id": "RES-NEW-001",
  "title": "Your Solution",
  "category": "BILLING",
  "confidence_base": 80,
  "keywords": ["keyword1", "keyword2"],
  "reasoning": "Why this works",
  "steps": ["Step 1", "Step 2"],
  "expected_outcome": "What happens"
}
```

2. Restart backend.

### Modifying AI Detection Logic

**Issue Category Detection:** Edit `backend/models/llm_simulator.py` `generate_summary()` function, update keyword lists.

**Solution Confidence Scoring:** Edit `backend/models/resolution_engine.py` `get_recommendations()` function, adjust confidence calculation formula.

### Frontend Styling

All styles are in `frontend/src/App.css`. Key sections:
- Lines 1-50: Layout grid
- Lines 246-258: **Transcript scrolling (DO NOT REMOVE—required for long calls)**
- Lines 300+: Component-specific styles

### Testing

**Manual Testing:**
1. Start both servers
2. Open `http://localhost:3000`
3. Click demo call buttons (CALL-001 through CALL-005)
4. Verify transcript streams, AI insights update, solutions appear
5. Check CRM auto-fill after call ends

**No automated tests exist.** All testing is manual through UI.

## Important Implementation Details

### Transcript Scrolling
The Live Transcript panel MUST have fixed height with `overflow-y: auto` to enable scrolling. This is implemented in `App.css` lines 246-258. DO NOT change this to `flex` or `auto` height as it will break scrolling for long calls (especially CALL-002 with 89 messages).

### WebSocket Connection Management
Each demo call creates a new WebSocket connection. The connection is managed in `App.js` `startDemoCall()` function. Always close previous connections before starting a new call to avoid memory leaks.

### CORS Configuration
Backend allows `localhost:3000` and `localhost:3001`. If frontend runs on a different port, update `backend/app/main.py` CORS `allow_origins`.

### Data File Paths
Backend uses `Path(__file__).parent.parent.parent / "data"` to locate JSON files. This assumes:
```
mvp/
  backend/
    app/main.py (runs from here)
  data/           (resolves to here)
```
Do not move data files without updating this path logic.

## Demo Scenarios

The MVP includes 5 pre-configured scenarios:

1. **CALL-001 - Billing Dispute** (John Smith): Roaming charges, 39 messages, 6m 32s
2. **CALL-002 - Network Outage** (Maria Rodriguez): Service loss, 89 messages, 8m 05s
3. **CALL-003 - SIM Activation** (David Chen): New customer BYOD, 12m 18s
4. **CALL-004 - Device Support** (Patricia Johnson): iPhone won't turn on, 14m 47s
5. **CALL-005 - Plan Upgrade** (Marcus Williams): Hotspot needs, upsell, 9m 54s

Each scenario has corresponding customer data in `customers.json` and solution templates in `resolutions.json`.

## Documentation Files

The root directory contains extensive markdown documentation:

- `README.md`: Project overview and metrics
- `MVP_SIMULATION_PLAN.md`: Complete architecture and features spec
- `CUSTOMER_DATA.md`: Detailed customer profile data
- `CALL_TRANSCRIPTS.md`: Full transcript text for all 5 calls
- `AI_OUTPUTS.md` / `AI_OUTPUTS_PART2.md`: Example AI analysis outputs
- `ANALYTICS_DASHBOARD.md`: Simulated 90-day metrics and ROI
- `DEMO_FLOW.md`: Step-by-step presentation guide
- `INDEX.md`: Documentation roadmap

The `mvp/` directory also contains implementation-specific docs:
- `mvp/QUICK_START.md`: 2-minute test guide
- `mvp/FINAL_SUMMARY.md`: Transcript scrolling feature summary
- `mvp/TEST_NOW.md`: Testing instructions

## Technology Stack

- **Backend:** Python 3.10+, FastAPI, Uvicorn, WebSockets
- **Frontend:** React 18, Axios, React Scripts
- **Data:** JSON files (no database)
- **AI:** Simulated with keyword matching (no real LLM APIs)

## Production Considerations

**This is a demonstration MVP, NOT production-ready:**
- No authentication or authorization
- No database (in-memory JSON)
- No real AI models (keyword-based simulation)
- No error recovery or retry logic
- No logging or monitoring
- Single-user design (no concurrency handling)
- No tests

To move to production, see `mvp/README.md` "Production Considerations" section for required integrations (real LLMs, database, CRM, authentication, etc.).

## Git Repository

The project is tracked in git (`.git` directory exists). There is no remote configured yet. To sync with GitHub, initialize remote and push.

## Dependencies

**Backend:**
```
fastapi
uvicorn
python-multipart
websockets
```

**Frontend:**
```
react (^18.2.0)
react-dom (^18.2.0)
axios (^1.6.0)
react-scripts (5.0.1)
```

## Port Usage

- **8000**: Backend API and WebSocket server
- **3000**: Frontend development server (default)

If ports are in use:
```bash
# Check port usage
lsof -i :8000
lsof -i :3000

# Kill processes if needed
kill <PID>
```

## Troubleshooting

**Backend won't start:**
- Check Python version: `python --version` (need 3.10+)
- Reinstall dependencies: `pip install -r requirements.txt --force-reinstall`
- Verify data files exist: `ls mvp/data/*.json`

**Frontend won't start:**
- Clear node_modules: `rm -rf mvp/frontend/node_modules && cd mvp/frontend && npm install`
- Check React Scripts: `npm list react-scripts`

**WebSocket not connecting:**
- Verify backend is running on port 8000
- Check browser console for connection errors
- Ensure CORS settings allow frontend origin

**Transcript not scrolling:**
- Verify `App.css` lines 246-258 have `height: 400px` and `overflow-y: auto`
- Check browser dev tools for CSS overrides
- See `mvp/QUICK_START.md` for detailed diagnosis

## File Modification Guidelines

**When modifying backend:**
- Always maintain JSON data loading pattern
- Keep CORS origins updated if frontend port changes
- Preserve WebSocket message format: `{"type": "...", "data": {...}}`
- Update `resolution_engine.py` carefully—confidence scoring affects demo quality

**When modifying frontend:**
- Keep App.css transcript scrolling styles intact (lines 246-258)
- Update `services/api.js` if adding new endpoints
- Maintain WebSocket message handling in App.js
- Test all 5 demo calls after changes (especially CALL-002 for scrolling)

**When modifying data:**
- Maintain JSON schema structure
- Update all related files (e.g., new customer needs billing, tickets entries)
- Test backend loads without errors: `curl http://localhost:8000/api/health`
