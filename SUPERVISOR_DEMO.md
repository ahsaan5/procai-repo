# Supervisor Dashboard Demo Guide

## Overview

The Supervisor Dashboard is a real-time monitoring interface that allows supervisors to:
- Monitor all active customer support calls
- Track sentiment and risk scores in real-time
- Identify high-risk calls requiring intervention
- Follow AI-guided intervention workflows
- Prevent customer churn through timely escalation

## Quick Start (3 Steps)

### 1. Start the Backend

```bash
cd mvp/backend
python -m uvicorn app.main:app --reload --port 8000
```

The backend will load the supervisor demo data from `/mvp/data/supervisor_demo.json`.

### 2. Start the Frontend

```bash
cd mvp/frontend
npm start
```

The app will open at `http://localhost:3000`.

### 3. Access Supervisor Dashboard

1. Click the **"👥 Supervisor View"** button in the header
2. You'll see 3 active calls:
   - **CALL-002**: Maria Rodriguez - Network Outage (FLAGGED - Risk 85)
   - **CALL-001**: John Smith - Billing Dispute (Risk 42)
   - **CALL-003**: David Chen - SIM Activation (Risk 12)

## Demo Flow (60 Seconds)

### Phase 1: Dashboard Overview (0-10 seconds)
- View metrics bar showing:
  - 3 Active Calls
  - 1 Flagged Call
  - Average Risk Score
  - Average Sentiment
  - High Risk Calls count
- Notice CALL-002 card pulsing with red border

### Phase 2: Call Details (10-20 seconds)
1. Click **"View Details"** on CALL-002 (Maria Rodriguez)
2. Side panel slides in showing:
   - Customer profile (LTV: $2,890, Perfect payment history)
   - Issue details (Network outage, 3+ hours)
   - Sentiment timeline (ANGRY - trending down)
   - Transcript summary
   - Key phrases ("I'm losing money", "switching providers")
   - Flag reason: "Negative sentiment for 3+ minutes, threatening cancellation"

### Phase 3: AI-Guided Intervention (20-50 seconds)
1. Click **"🚨 Join Call & Intervene"** button
2. Full-screen intervention modal appears with:
   - **AI Recommendation Banner**: 92% confidence, recommended action
   - **Success Metrics**: Target sentiment improvement, risk reduction, time estimate
3. Click **"🎧 Join Call Now"** to start intervention
4. Follow 4-step guided workflow:

   **Step 1 - Acknowledge Business Impact** (CRITICAL priority)
   - Suggested script provided
   - Key talking points listed
   - Expected outcome defined
   - Click "Mark Step 1 Complete"

   **Step 2 - Provide Immediate Workaround** (HIGH priority)
   - WiFi calling setup instructions
   - Technical walkthrough steps
   - Click "Mark Step 2 Complete"

   **Step 3 - Apply Service Credit** (HIGH priority)
   - $35 credit applied immediately
   - Explanation script
   - Click "Mark Step 3 Complete"

   **Step 4 - Setup Proactive Communication** (MEDIUM priority)
   - ETA provided (4:00 PM)
   - Follow-up scheduled
   - Click "Mark Step 4 Complete"

5. Watch progress bar fill as steps complete

### Phase 4: Success & Return (50-60 seconds)
1. Click **"✅ Finish Intervention"** button
2. Modal closes, return to dashboard
3. View updated metrics:
   - Flagged Calls: 0 (reduced from 1)
   - Risk Score reduced from 85 → 25
   - Sentiment improved: ANGRY → SATISFIED
   - Churn prevented

## Key Features Demonstrated

### 1. Real-Time Monitoring
- Live call cards with customer info, agent, issue category
- Visual sentiment indicators (😊 😐 😟 😠)
- Risk score gauges (0-100 scale)
- Automatic flagging of high-risk calls

### 2. Customer Context
- Lifetime value (LTV) displayed prominently
- Payment history
- Account tenure
- Current plan details
- Business impact assessment

### 3. AI-Powered Intelligence
- **Issue Category Detection**: Network Outage, Billing, Technical, etc.
- **Sentiment Analysis**: Real-time emotion tracking
- **Risk Scoring**: Algorithmic churn prediction
- **Intervention Recommendations**: 92% confidence scoring
- **Guided Resolution**: Step-by-step supervisor scripts

### 4. Intervention Workflow
- Pre-scripted talking points for consistency
- Technical walkthroughs for complex issues
- Expected outcomes for each step
- Progress tracking
- Success metrics

## Technical Implementation

### Backend API Endpoints

```
GET  /api/supervisor/dashboard
     → Returns all active calls + metrics

GET  /api/supervisor/call/{call_id}
     → Returns detailed call information

GET  /api/supervisor/intervention-plan/{call_id}
     → Returns AI-guided intervention steps

POST /api/supervisor/intervene
     → Initiates supervisor intervention

POST /api/supervisor/intervention-step
     → Marks a step as complete

POST /api/supervisor/intervention-complete/{call_id}
     → Finalizes intervention and updates call status

GET  /api/supervisor/metrics
     → Returns supervisor performance metrics
```

### Data Structure

Demo data is loaded from `/mvp/data/supervisor_demo.json`:

```json
{
  "demo_scenario": {
    "demo_calls": [
      {
        "call_id": "CALL-002",
        "customer_name": "Maria Rodriguez",
        "sentiment": "ANGRY",
        "risk_score": 85,
        "is_flagged": true,
        "ai_intervention_plan": {
          "recommended_action": "supervisor_join",
          "confidence": 92,
          "guided_steps": [ /* 4-step workflow */ ]
        }
      }
    ]
  }
}
```

### Frontend Components

- **SupervisorDashboard.js**: Main dashboard with call cards
- **CallDetailPanel.js**: Sliding panel with call details
- **InterventionModal.js**: Full-screen guided intervention UI

### Styling

All supervisor styles are in `/mvp/frontend/src/supervisor.css`:
- Purple gradient header (#8b5cf6 → #6366f1)
- Red flagged call indicators (#dc2626)
- Green success states (#10b981)
- Smooth animations and transitions

## Business Value Demonstrated

### Metrics Prevented Churn
- **Customer LTV Preserved**: $2,890 (Maria Rodriguez)
- **Sentiment Recovery**: ANGRY → SATISFIED in 6 minutes
- **Risk Reduction**: 85 → 25 (60-point improvement)
- **Intervention Time**: 6 minutes vs potential hours-long escalation

### AI Efficiency
- **92% Confidence**: AI accurately identifies high-risk situations
- **Guided Scripts**: Reduces supervisor decision-making time
- **Proactive Flagging**: Issues caught before customer hangs up
- **Success Tracking**: Measurable intervention outcomes

### Supervisor Productivity
- **Real-Time Visibility**: No need to manually monitor each call
- **Prioritized Alerts**: Focus on highest-risk calls only
- **Consistent Resolution**: Scripted approaches ensure quality
- **Performance Metrics**: Track intervention success rate

## Demo Scenarios

### Scenario 1: Network Outage Intervention (Primary Demo)
- **Customer**: Maria Rodriguez (TC-923461)
- **Issue**: 3+ hour service outage affecting work-from-home
- **Sentiment**: ANGRY → SATISFIED
- **Risk**: 85 → 25
- **Outcome**: Churn prevented, $35 credit applied, WiFi calling enabled

### Scenario 2: Billing Dispute (Low Risk - No Intervention)
- **Customer**: John Smith (TC-887234)
- **Issue**: Unexpected roaming charges
- **Sentiment**: FRUSTRATED (stable)
- **Risk**: 42 (manageable)
- **Outcome**: Agent handling well, no supervisor intervention needed

### Scenario 3: New Customer Setup (Positive)
- **Customer**: David Chen (TC-104529)
- **Issue**: SIM activation
- **Sentiment**: SATISFIED
- **Risk**: 12 (very low)
- **Outcome**: Smooth onboarding experience

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend loads successfully
- [ ] "Supervisor View" button appears in header
- [ ] Dashboard shows 3 call cards
- [ ] Metrics bar displays correct counts
- [ ] CALL-002 shows red border and "HIGH RISK" badge
- [ ] "View Details" opens slide-in panel
- [ ] Call details panel shows all sections correctly
- [ ] Sentiment timeline displays bars with colors
- [ ] "Join Call & Intervene" button opens modal
- [ ] AI recommendation banner displays
- [ ] "Join Call Now" reveals 4 steps
- [ ] Each step expands to show script and details
- [ ] "Mark Step Complete" buttons work
- [ ] Progress bar fills as steps complete
- [ ] "Finish Intervention" closes modal
- [ ] Dashboard updates to show 0 flagged calls
- [ ] "Back to Agent View" returns to agent dashboard

## Troubleshooting

### Backend Error: Module not found
```bash
# Ensure you're in the backend directory
cd mvp/backend

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend Error: supervisor.css not found
```bash
# Ensure supervisor.css exists in src/
ls mvp/frontend/src/supervisor.css

# If missing, check App.js import:
import './supervisor.css';
```

### Dashboard shows no calls
- Check browser console for API errors
- Verify backend is running on port 8000
- Test endpoint: `curl http://localhost:8000/api/supervisor/dashboard`

### Intervention modal doesn't appear
- Check browser console for errors
- Verify CallDetailPanel and InterventionModal components exist
- Ensure supervisor.css is loaded (check Network tab)

## Production Considerations

This is a **demo implementation** for stakeholder presentations. For production:

### Required Enhancements
1. **Real-Time Updates**: Implement WebSocket for live sentiment/risk updates
2. **Authentication**: Add supervisor login and permissions
3. **Database**: Replace JSON with PostgreSQL/MongoDB
4. **Real AI Models**: Integrate actual sentiment analysis APIs (AWS Comprehend, Azure Text Analytics)
5. **Call Recording**: Store actual call audio and transcripts
6. **Audit Logging**: Track all supervisor interventions
7. **Performance Metrics**: Real dashboard with historical data
8. **Multi-Supervisor**: Handle concurrent supervisors and call assignments
9. **Mobile Support**: Responsive design for tablets/phones
10. **Notifications**: Push alerts for flagged calls

### Integration Points
- **Telephony System**: Twilio, Amazon Connect, Genesys
- **CRM**: Salesforce, Zendesk, HubSpot
- **AI/ML**: OpenAI GPT-4, AWS Comprehend, Google DialogFlow
- **Analytics**: Tableau, Power BI, Looker

## Files Modified/Created

### New Files
- `/mvp/data/supervisor_demo.json` - Demo scenario data
- `/mvp/backend/app/supervisor_routes.py` - API endpoints
- `/mvp/frontend/src/components/SupervisorDashboard.js` - Main dashboard
- `/mvp/frontend/src/components/CallDetailPanel.js` - Detail panel
- `/mvp/frontend/src/components/InterventionModal.js` - Intervention UI
- `/mvp/frontend/src/supervisor.css` - All supervisor styles

### Modified Files
- `/mvp/backend/app/main.py` - Added supervisor router
- `/mvp/frontend/src/services/api.js` - Added supervisor API calls
- `/mvp/frontend/src/App.js` - Added supervisor view toggle

## Support

For issues or questions:
- Check `/mvp/README.md` for general MVP setup
- Review `CLAUDE.md` for codebase architecture
- See `supervisorscope.md` for complete technical specification
