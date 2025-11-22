# ProcAI MVP - Demo Checklist

## Pre-Demo Setup ✅

- [x] Backend files created
- [x] Frontend files created
- [x] Data files generated
- [x] Python dependencies installed
- [x] npm dependencies installed
- [x] Run scripts created
- [x] System verified

## Starting the Demo

### Step 1: Start Backend Server
```bash
cd /Users/ahsaanrizvi/Projects_Cursor/procai/mvp
./start_backend.sh
```

**Expected output:**
```
🚀 Starting ProcAI Backend...

INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

✅ **Checkpoint:** Visit http://localhost:8000/docs to see API documentation

---

### Step 2: Start Frontend (New Terminal)
```bash
cd /Users/ahsaanrizvi/Projects_Cursor/procai/mvp
./start_frontend.sh
```

**Expected output:**
```
⚛️  Starting ProcAI Frontend...

Compiled successfully!
Local: http://localhost:3000
```

✅ **Checkpoint:** Browser opens automatically to http://localhost:3000

---

## Running Demo Scenario 1: Billing Dispute

### What You'll Demonstrate:

1. **Click "Start Demo Call"** button
   - Select "Call 1: Billing Dispute"

2. **Customer Profile Loads** (Left Panel)
   - Name: John Smith
   - Account: TC-887234
   - Plan: Unlimited Plus ($89.99/mo)
   - Device: iPhone 15 Pro

3. **Call Transcript Streams** (Center Panel)
   - Real-time line-by-line display
   - Agent and Customer messages
   - Timestamps for each line
   - Auto-scrolls as new lines arrive

4. **AI Insights Update** (Right Panel - Top)
   - Issue Category: BILLING
   - Sentiment: FRUSTRATED → SATISFIED
   - Confidence: 94%
   - Key Points extracted

5. **Solution Recommendations Appear** (Right Panel - Bottom)
   - Solution 1: Apply 50% courtesy credit (90% confidence)
   - Solution 2: Educate on TravelPass (85% confidence)
   - Solution 3: Review account settings (75% confidence)

6. **Metrics Update** (Top Bar)
   - AHT: 640s → 430s
   - FCR: 68% → 87%
   - CSAT: 78% → 92%

7. **Call Ends** (~6 minutes)
   - Auto-filled ticket modal appears
   - Pre-populated with:
     - Issue summary
     - Resolution steps
     - Customer sentiment
     - Recommended actions
   - Click "Save Ticket"

### Key Talking Points:
- "Notice how the AI detects the customer's frustration early"
- "Solutions appear proactively before agent needs them"
- "Ticket is auto-generated with zero manual entry"
- "33% reduction in handle time while improving satisfaction"

---

## Running Demo Scenario 2: Network Outage

### What You'll Demonstrate:

1. **Click "Start Demo Call"** button
   - Select "Call 2: Network Outage"

2. **Customer Profile Loads**
   - Name: Maria Rodriguez
   - Account: TC-923461
   - Plan: Unlimited Premium ($119.99/mo)
   - Location: West Hollywood, CA

3. **High-Urgency Detection**
   - Sentiment: ANGRY (detected immediately)
   - Issue Category: NETWORK
   - Priority: HIGH

4. **Proactive Solutions**
   - WiFi calling workaround suggested
   - Service credit calculation
   - Outage notification setup

5. **Real-Time Sentiment Tracking**
   - ANGRY → FRUSTRATED → SATISFIED
   - Watch confidence scores update

6. **Metrics Impact**
   - Crisis resolution under 8 minutes
   - Customer satisfaction recovered
   - Retention risk mitigated

### Key Talking Points:
- "AI immediately recognizes high-priority situation"
- "Workaround suggested before customer asks"
- "Proactive credit offer defuses tension"
- "Agent empowered with instant solutions"

---

## Demo Script (3-Minute Version)

**Opening (30 seconds):**
"ProcAI is an AI-powered assistant for telecom support agents. It provides real-time guidance during customer calls, reducing handle time by 33% while improving satisfaction scores by 14 points."

**Live Demo (2 minutes):**
1. Start Call 1
2. "Watch as the transcript streams in real-time..."
3. "Notice AI insights appearing in the right panel"
4. "Solutions are suggested proactively with confidence scores"
5. "When the call ends, the ticket is auto-generated"
6. Click through auto-filled ticket

**Closing (30 seconds):**
"This simulation demonstrates the core workflow. In production, this would integrate with your telephony system, CRM, and knowledge base to provide even more accurate, personalized recommendations."

---

## Demo Script (5-Minute Version)

**Opening (1 minute):**
"TelcoMax was facing challenges: 640-second average handle times, 68% first-call resolution, and declining customer satisfaction. ProcAI changed that."

**Problem Statement:**
"Agents were spending too much time searching for solutions, customers were frustrated waiting, and management had no visibility into call quality until after the fact."

**Solution Introduction:**
"ProcAI uses AI to analyze calls in real-time, providing instant insights and recommended solutions while the call is happening."

**Live Demo - Scenario 1 (2 minutes):**
[Run billing dispute demo]

**Live Demo - Scenario 2 (1.5 minutes):**
[Run network outage demo]

**Results (30 seconds):**
"After 90 days: AHT dropped 33%, FCR increased to 87%, CSAT jumped to 92%. ROI: 1,884%."

---

## Technical Deep-Dive Demo (10 Minutes)

For technical audiences:

1. **Architecture Overview** (2 min)
   - FastAPI backend
   - React frontend
   - WebSocket real-time communication
   - Show API docs at /docs

2. **Live API Demo** (2 min)
   ```bash
   # Show API endpoints
   curl http://localhost:8000/api/customer/TC-887234

   # Show AI summarization
   curl -X POST http://localhost:8000/api/summarize_call \
     -H "Content-Type: application/json" \
     -d '{"transcript":"Customer frustrated about billing","customer_id":"TC-887234"}'
   ```

3. **WebSocket Demo** (2 min)
   - Open browser dev tools
   - Show WebSocket connection
   - Watch messages streaming

4. **Component Architecture** (2 min)
   - Show React component structure
   - Explain state management
   - Demonstrate real-time updates

5. **Data Models** (2 min)
   - Show JSON data structure
   - Explain resolution engine logic
   - Discuss LLM integration points

---

## Common Questions & Answers

**Q: Is this using a real LLM?**
A: This MVP simulates AI using keyword matching. Production would integrate OpenAI, Anthropic, or custom models.

**Q: How does it integrate with existing systems?**
A: Via APIs - connects to your telephony (Twilio/Five9), CRM (Salesforce/Zendesk), and knowledge base.

**Q: What about data privacy?**
A: All processing can be done on-premises or in your private cloud. No customer data leaves your environment.

**Q: How long to implement?**
A: Pilot in 4-6 weeks, full rollout in 3 months. Includes training, integration, and optimization.

**Q: What's the ROI timeline?**
A: Typically see measurable improvements within 30 days, full ROI within 6 months.

**Q: Can it handle multiple languages?**
A: Yes, underlying LLMs support 100+ languages. UI can be localized.

---

## Post-Demo Follow-Up

### Materials to Share:
- [ ] Screenshot of dashboard
- [ ] Demo recording (if recorded)
- [ ] ROI calculator spreadsheet
- [ ] Technical architecture diagram
- [ ] Integration requirements doc
- [ ] Pricing proposal

### Next Steps Discussion:
1. Technical integration assessment
2. Pilot scope definition (# agents, duration)
3. Success metrics agreement
4. Data security review
5. Procurement process timeline

---

## Backup Plans

### If Backend Fails to Start:
- Check Python version: `python --version`
- Reinstall dependencies: `pip install -r requirements.txt`
- Try different port: `--port 8001`

### If Frontend Fails to Start:
- Clear cache: `rm -rf node_modules && npm install`
- Check Node version: `node --version`
- Use different port: `PORT=3001 npm start`

### If Demo Stutters:
- Close other applications
- Use pre-recorded video as backup
- Fall back to static screenshots

### If Questions Stump You:
- "Great question - let me get our technical team's input on that"
- "I'll follow up with detailed documentation on that specific point"
- "Would you like to schedule a deeper technical dive with our engineers?"

---

## Success Metrics

Demo is successful if audience:
- [ ] Understands the core value proposition
- [ ] Sees real-time AI assistance in action
- [ ] Recognizes ROI potential
- [ ] Asks questions about implementation
- [ ] Requests next steps

---

**Ready to demo! 🚀**

Run through both scenarios at least once before live demo.
