import React, { useState, useEffect } from 'react';
import './App.css';
import './supervisor.css';
import { api, createWebSocket } from './services/api';
import CustomerPanel from './components/CustomerPanel';
import TranscriptPanel from './components/TranscriptPanel';
import AIInsights from './components/AIInsights';
import SolutionsPanel from './components/SolutionsPanel';
import MetricsBar from './components/MetricsBar';
import CallSummary from './components/CallSummary';
import SupervisorDashboard from './components/SupervisorDashboard';

// Fake solutions for Call 1 (Billing) - Brief format
const CALL1_SOLUTIONS = [
  {
    resolution_id: "RES-BILL-001",
    title: "Apply 50% Roaming Courtesy Credit",
    category: "BILLING",
    confidence: 95,
    rank: 1,
    description: "Apply $33.72 credit (50% of $67 roaming charges) for Canada trip. Customer wasn't aware of international roaming policy. Builds goodwill with 3+ year loyal customer."
  },
  {
    resolution_id: "RES-BILL-002",
    title: "Set Up TravelPass Auto-Activation",
    category: "BILLING",
    confidence: 88,
    rank: 2,
    description: "Enable TravelPass ($10/day when traveling). Would have saved $17 on this trip. Auto-activates in Canada/Mexico, no upfront cost. Perfect for business travelers."
  },
  {
    resolution_id: "RES-BILL-003",
    title: "Apply Loyalty Discount Package",
    category: "BILLING",
    confidence: 76,
    rank: 3,
    description: "Review 3+ year customer for retention offers and loyalty credits. Add autopay discount ($5-10/month). Offset billing surprise with goodwill gesture."
  }
];

// Fake AI insights for Call 1 (Billing)
const CALL1_INSIGHTS = {
  customerInsights: [
    { icon: "💎", text: "Customer has never missed a payment in 3+ years", type: "positive" },
    { icon: "⭐", text: "Premium customer - High retention priority", type: "highlight" },
    { icon: "📊", text: "Lifetime value: $3,456 - Top 15% of customer base", type: "positive" },
    { icon: "💡", text: "Eligible for loyalty rewards and retention offers", type: "recommendation" },
    { icon: "✈️", text: "Travel pattern detected: Frequent trips to Canada for work", type: "info" }
  ]
};

// Fake AI insights data for Call 1
const CALL1_AI_INSIGHTS = {
  issue_category: "Billing Dispute",
  sentiment: "FRUSTRATED",
  urgency_level: "MEDIUM",
  confidence: 0.92,
  key_facts: [
    "Customer charged $67 for international roaming in Canada",
    "Trip dates: May 8-12 (5 days)",
    "Customer was unaware of roaming charges",
    "Perfect payment history - 3+ years",
    "High retention priority customer"
  ]
};

// Fake AI insights for Call 2 (Network Outage)
const CALL2_INSIGHTS = {
  customerInsights: [
    { icon: "💎", text: "Customer has never missed a payment in 2+ years", type: "positive" },
    { icon: "⭐", text: "Premium Unlimited plan - Expects high service quality", type: "highlight" },
    { icon: "💼", text: "Work-from-home customer - Network downtime = revenue loss", type: "urgent" },
    { icon: "📊", text: "Lifetime value: $2,890 - High-value retention target", type: "positive" },
    { icon: "💡", text: "Recommend: Priority support + proactive communication", type: "recommendation" }
  ]
};

// Fake AI insights data for Call 2
const CALL2_AI_INSIGHTS = {
  issue_category: "Network Outage",
  sentiment: "ANGRY",
  urgency_level: "HIGH",
  confidence: 0.95,
  key_facts: [
    "Service outage ongoing for 3+ hours in West Hollywood (90069)",
    "Customer works from home - business critical issue",
    "Tower maintenance causing disruption",
    "Premium Unlimited plan customer",
    "Immediate workaround needed for work calls"
  ]
};

// Fake solutions for Call 2 (Network Outage) - Brief format
const CALL2_SOLUTIONS = [
  {
    resolution_id: "RES-TECH-001",
    title: "Enable WiFi Calling + $35 Credit",
    category: "TECHNICAL",
    confidence: 96,
    rank: 1,
    description: "Guide customer through WiFi calling setup for immediate workaround. Apply $35 service disruption credit. Set notification for when tower repair completes (ETA 4:00 PM)."
  },
  {
    resolution_id: "RES-TECH-002",
    title: "Priority Escalation to Network Ops",
    category: "TECHNICAL",
    confidence: 89,
    rank: 2,
    description: "Create priority ticket for 3+ hour business impact. Escalate to Network Operations Center. Schedule hourly updates. Offer temporary mobile hotspot if available."
  },
  {
    resolution_id: "RES-TECH-003",
    title: "Setup Proactive Outage Alerts",
    category: "TECHNICAL",
    confidence: 81,
    rank: 3,
    description: "Enable network status notifications to prevent future communication gaps. Add $10 credit for notification delay. Provide status page access (status.telcomax.com/90069)."
  }
];

function App() {
  const [showSupervisor, setShowSupervisor] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [billing, setBilling] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [fullTranscript, setFullTranscript] = useState('');
  const [aiInsights, setAIInsights] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [ws, setWs] = useState(null);
  const [callId, setCallId] = useState(null);
  const [callStartTime, setCallStartTime] = useState(null);
  const [callSummary, setCallSummary] = useState(null);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [appliedSolution, setAppliedSolution] = useState(null);
  const [customInsights, setCustomInsights] = useState(null);

  const startDemoCall = async (demoCallId, customerId) => {
    setCallActive(true);
    setTranscript([]);
    setFullTranscript('');
    setAIInsights(null);
    setSolutions([]);
    setCallId(demoCallId);
    setCallStartTime(Date.now());
    setCallSummary(null);
    setSelectedSolution(null);
    setAppliedSolution(null);
    setCustomInsights(null);

    // Load customer data
    try {
      const customerData = await api.getCustomer(customerId);
      setCustomer(customerData.data);

      const billingData = await api.getBilling(customerId);
      setBilling(billingData.data);
    } catch (error) {
      console.error('Error loading customer data:', error);
    }

    // Choose insights and solutions based on call
    const solutionSet = demoCallId === 'CALL-001' ? CALL1_SOLUTIONS : CALL2_SOLUTIONS;
    const insightSet = demoCallId === 'CALL-001' ? CALL1_INSIGHTS : CALL2_INSIGHTS;
    const aiInsightSet = demoCallId === 'CALL-001' ? CALL1_AI_INSIGHTS : CALL2_AI_INSIGHTS;

    // Show AI insights immediately (1 second after call starts)
    setTimeout(() => {
      setAIInsights(aiInsightSet);
    }, 1000);

    // Show custom customer insights after 2 seconds
    setTimeout(() => {
      setCustomInsights(insightSet);
    }, 2000);

    // Show all solutions at once after 8 seconds
    setTimeout(() => {
      setSolutions(solutionSet);
    }, 8000);

    // Connect WebSocket
    const websocket = createWebSocket(demoCallId);
    setWs(websocket);

    websocket.onopen = () => {
      console.log('WebSocket connected');
    };

    websocket.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'transcript_line') {
        const newTranscript = [...transcript, message.data];
        setTranscript(newTranscript);

        // Update full transcript
        const newFullTranscript = fullTranscript + ' ' + message.data.text;
        setFullTranscript(newFullTranscript);

        // Note: AI insights are now shown immediately via setTimeout in startDemoCall
        // We're using fake data instead of API calls for the demo
      } else if (message.type === 'call_end') {
        setCallActive(false);

        // Calculate call duration
        const duration = Math.floor((Date.now() - callStartTime) / 1000);
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;

        // Generate comprehensive call summary based on call type
        const summary = demoCallId === 'CALL-001' ? {
          callId: 'CALL-001',
          customerName: customer?.name || 'John Smith',
          customerId: customer?.customer_id || 'TC-887234',
          duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
          issue_category: 'Billing Dispute',
          issue_details: 'Unexpected $67 international roaming charges from Canada trip',
          resolution: appliedSolution ? appliedSolution.title : 'Applied 50% courtesy credit ($33.72) and educated on TravelPass',
          actions_taken: [
            'Verified roaming charges from May 8-12 Canada trip',
            'Applied $33.72 courtesy credit (50% of charges)',
            'Explained TravelPass option for future trips',
            'Updated customer profile with travel preferences'
          ],
          final_sentiment: 'SATISFIED',
          customer_feedback: 'Appreciated the credit and helpful explanation',
          next_steps: 'Customer will use TravelPass on next trip',
          agent_notes: '3+ year loyal customer, perfect payment history. Showed excellent retention opportunity.'
        } : {
          callId: 'CALL-002',
          customerName: customer?.name || 'Maria Rodriguez',
          customerId: customer?.customer_id || 'TC-923461',
          duration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
          issue_category: 'Network Outage',
          issue_details: '3+ hour service outage in West Hollywood affecting work-from-home operations',
          resolution: appliedSolution ? appliedSolution.title : 'Enabled WiFi calling and applied $35 service credit',
          actions_taken: [
            'Confirmed tower outage in West Hollywood (90069)',
            'Guided WiFi calling setup for immediate workaround',
            'Applied $35 service disruption credit',
            'Set up restoration notification alerts',
            'Documented business impact for network ops team'
          ],
          final_sentiment: 'SATISFIED',
          customer_feedback: 'Relieved to have workaround for business calls',
          next_steps: 'Monitor tower restoration (ETA 4:00 PM), follow up if needed',
          agent_notes: 'Premium customer, work-from-home critical. Escalated to ensure priority resolution.'
        };

        setCallSummary(summary);
        websocket.close();
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket closed');
      setCallActive(false);
    };
  };

  const handleSelectSolution = (solution) => {
    setSelectedSolution(solution);
    console.log('Agent selected solution:', solution.title);

    // Simulate AI applying the solution after 2 seconds
    setTimeout(() => {
      setAppliedSolution(solution);
    }, 2000);
  };

  const closeSummary = () => {
    setCallSummary(null);
  };

  const goHome = () => {
    // Close WebSocket if active
    if (ws) {
      ws.close();
    }

    // Reset all state
    setCallActive(false);
    setCustomer(null);
    setBilling(null);
    setTranscript([]);
    setFullTranscript('');
    setAIInsights(null);
    setSolutions([]);
    setWs(null);
    setCallId(null);
    setCallStartTime(null);
    setCallSummary(null);
    setSelectedSolution(null);
    setAppliedSolution(null);
    setCustomInsights(null);
  };

  // If supervisor view is active, show supervisor dashboard
  if (showSupervisor) {
    return <SupervisorDashboard onBackToAgent={() => setShowSupervisor(false)} />;
  }

  return (
    <div className="App">
      {/* Call Summary Modal */}
      <CallSummary summary={callSummary} onClose={closeSummary} />

      <header className="app-header">
        <div className="header-logo">
          <img src="/logo.png" alt="ProcAI Logo" className="logo" />
        </div>
        <div className="header-controls">
          {!callActive ? (
            <div className="demo-buttons">
              <button onClick={() => startDemoCall('CALL-001', 'TC-887234')} className="btn-primary">
                📞 Start Demo Call 1 (Billing)
              </button>
              <button onClick={() => startDemoCall('CALL-002', 'TC-923461')} className="btn-primary">
                📞 Start Demo Call 2 (Outage)
              </button>
              <button onClick={() => setShowSupervisor(true)} className="btn-supervisor">
                👥 Supervisor View
              </button>
            </div>
          ) : (
            <div className="call-controls">
              <div className="call-indicator">
                <span className="recording-dot"></span> Call in Progress
              </div>
              <button onClick={goHome} className="btn-home">
                🏠 Home
              </button>
            </div>
          )}
        </div>
      </header>

      <MetricsBar />

      <div className="dashboard-grid">
        <div className="left-panel">
          <CustomerPanel customer={customer} billing={billing} />
        </div>

        <div className="center-panel">
          <TranscriptPanel
            transcript={transcript}
            active={callActive}
            callStartTime={callStartTime}
          />
          <AIInsights insights={aiInsights} customer={customer} customInsights={customInsights} />
        </div>

        <div className="right-panel">
          <SolutionsPanel
            solutions={solutions}
            onSelectSolution={handleSelectSolution}
            callActive={callActive}
            appliedSolution={appliedSolution}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
