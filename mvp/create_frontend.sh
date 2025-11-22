#!/bin/bash

# Create Frontend Structure and Files
echo "🎨 Creating React Frontend..."

cd frontend

# Create public/index.html
mkdir -p public
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ProcAI Agent Dashboard</title>
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>
</html>
EOF

# Create src structure
mkdir -p src/components src/services

# API Service
cat > src/services/api.js << 'EOF'
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
EOF

# Main App Component
cat > src/App.js << 'EOF'
import React, { useState, useEffect } from 'react';
import './App.css';
import { api, createWebSocket } from './services/api';
import CustomerPanel from './components/CustomerPanel';
import TranscriptPanel from './components/TranscriptPanel';
import AIInsights from './components/AIInsights';
import SolutionsPanel from './components/SolutionsPanel';
import MetricsBar from './components/MetricsBar';

function App() {
  const [callActive, setCallActive] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [billing, setBilling] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [fullTranscript, setFullTranscript] = useState('');
  const [aiInsights, setAIInsights] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [ws, setWs] = useState(null);
  const [callId, setCallId] = useState(null);

  const startDemoCall = async (demoCallId, customerId) => {
    setCallActive(true);
    setTranscript([]);
    setFullTranscript('');
    setAIInsights(null);
    setSolutions([]);
    setCallId(demoCallId);

    // Load customer data
    try {
      const customerData = await api.getCustomer(customerId);
      setCustomer(customerData.data);

      const billingData = await api.getBilling(customerId);
      setBilling(billingData.data);
    } catch (error) {
      console.error('Error loading customer data:', error);
    }

    // Connect WebSocket
    const websocket = createWebSocket(demoCallId);
    setWs(websocket);

    websocket.onopen = () => {
      console.log('WebSocket connected');
    };

    websocket.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === 'transcript_line') {
        setTranscript(prev => [...prev, message.data]);

        // Update full transcript
        const newFullTranscript = fullTranscript + ' ' + message.data.text;
        setFullTranscript(newFullTranscript);

        // Update AI insights every few lines
        if (transcript.length % 3 === 0 && transcript.length > 0) {
          try {
            const insights = await api.summarizeCall(newFullTranscript, customerId);
            setAIInsights(insights.data);

            // Get solutions
            const solutionsData = await api.getSuggestions(
              newFullTranscript,
              customerId,
              insights.data.issue_category
            );
            setSolutions(solutionsData.data.solutions || []);
          } catch (error) {
            console.error('Error updating AI insights:', error);
          }
        }
      } else if (message.type === 'call_end') {
        setCallActive(false);
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

  return (
    <div className="App">
      <header className="app-header">
        <h1>🤖 ProcAI Agent Dashboard</h1>
        <div className="header-controls">
          {!callActive ? (
            <div className="demo-buttons">
              <button onClick={() => startDemoCall('CALL-001', 'TC-887234')} className="btn-primary">
                📞 Start Demo Call 1 (Billing)
              </button>
              <button onClick={() => startDemoCall('CALL-002', 'TC-923461')} className="btn-primary">
                📞 Start Demo Call 2 (Outage)
              </button>
            </div>
          ) : (
            <div className="call-indicator">
              <span className="recording-dot"></span> Call in Progress
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
          <TranscriptPanel transcript={transcript} active={callActive} />
          <AIInsights insights={aiInsights} />
        </div>

        <div className="right-panel">
          <SolutionsPanel solutions={solutions} />
        </div>
      </div>
    </div>
  );
}

export default App;
EOF

# Components
cat > src/components/CustomerPanel.js << 'EOF'
import React from 'react';

function CustomerPanel({ customer, billing }) {
  if (!customer) {
    return (
      <div className="panel customer-panel">
        <h3>👤 Customer Profile</h3>
        <p className="no-data">No customer loaded. Start a call to begin.</p>
      </div>
    );
  }

  return (
    <div className="panel customer-panel">
      <h3>👤 Customer Profile</h3>
      <div className="customer-info">
        <div className="info-row">
          <strong>{customer.name}</strong>
        </div>
        <div className="info-row">
          <span className="label">Account:</span> {customer.customer_id}
        </div>
        <div className="info-row">
          <span className="label">Phone:</span> {customer.phone}
        </div>
        <div className="info-row">
          <span className="label">Email:</span> {customer.email}
        </div>
        <div className="info-row">
          <span className="label">Tenure:</span> {customer.tenure_months} months
        </div>
        <div className="info-row">
          <span className="label">Status:</span>
          <span className={`status ${customer.account_status.toLowerCase()}`}>
            {customer.account_status}
          </span>
        </div>
      </div>

      <h4>📱 Plan Details</h4>
      <div className="plan-info">
        <div className="info-row">
          <strong>{customer.plan.name}</strong>
        </div>
        <div className="info-row">
          <span className="label">Cost:</span> ${customer.plan.monthly_cost}/month
        </div>
        <div className="info-row">
          <span className="label">Data:</span> {customer.plan.data}
        </div>
        <div className="info-row">
          <span className="label">Hotspot:</span> {customer.plan.hotspot}
        </div>
      </div>

      <h4>📱 Device</h4>
      <div className="device-info">
        <div className="info-row">
          {customer.device.manufacturer} {customer.device.model}
        </div>
      </div>

      {billing && (
        <>
          <h4>💳 Current Bill</h4>
          <div className="billing-info">
            <div className="info-row highlight">
              <span className="label">Amount:</span>
              <strong>${billing.current_bill.amount}</strong>
            </div>
            <div className="info-row">
              <span className="label">Due:</span> {billing.current_bill.due_date}
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span className={`status ${billing.current_bill.status.toLowerCase()}`}>
                {billing.current_bill.status}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomerPanel;
EOF

cat > src/components/TranscriptPanel.js << 'EOF'
import React, { useEffect, useRef } from 'react';

function TranscriptPanel({ transcript, active }) {
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  return (
    <div className="panel transcript-panel">
      <h3>
        📝 Live Transcript
        {active && <span className="live-indicator">● LIVE</span>}
      </h3>
      <div className="transcript-container">
        {transcript.length === 0 ? (
          <p className="no-data">Waiting for call to start...</p>
        ) : (
          transcript.map((line, idx) => (
            <div key={idx} className={`transcript-line ${line.speaker.toLowerCase()}`}>
              <span className="timestamp">[{line.timestamp}]</span>
              <span className="speaker">{line.speaker}:</span>
              <span className="text">{line.text}</span>
            </div>
          ))
        )}
        <div ref={transcriptEndRef} />
      </div>
    </div>
  );
}

export default TranscriptPanel;
EOF

cat > src/components/AIInsights.js << 'EOF'
import React from 'react';

function AIInsights({ insights }) {
  if (!insights) {
    return (
      <div className="panel ai-insights-panel">
        <h3>🤖 AI Insights</h3>
        <p className="no-data">AI analysis will appear here during the call...</p>
      </div>
    );
  }

  return (
    <div className="panel ai-insights-panel">
      <h3>🤖 AI Insights</h3>
      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-label">Issue Category</div>
          <div className="insight-value category">{insights.issue_category}</div>
        </div>
        <div className="insight-card">
          <div className="insight-label">Sentiment</div>
          <div className={`insight-value sentiment ${insights.sentiment.toLowerCase()}`}>
            {insights.sentiment}
          </div>
        </div>
        <div className="insight-card">
          <div className="insight-label">Urgency</div>
          <div className={`insight-value urgency ${insights.urgency_level.toLowerCase()}`}>
            {insights.urgency_level}
          </div>
        </div>
        <div className="insight-card">
          <div className="insight-label">Confidence</div>
          <div className="insight-value">{Math.round(insights.confidence * 100)}%</div>
        </div>
      </div>

      {insights.key_facts && insights.key_facts.length > 0 && (
        <div className="key-facts">
          <h4>Key Facts</h4>
          <ul>
            {insights.key_facts.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AIInsights;
EOF

cat > src/components/SolutionsPanel.js << 'EOF'
import React from 'react';

function SolutionsPanel({ solutions }) {
  if (!solutions || solutions.length === 0) {
    return (
      <div className="panel solutions-panel">
        <h3>💡 Recommended Solutions</h3>
        <p className="no-data">Solutions will appear here as the call progresses...</p>
      </div>
    );
  }

  return (
    <div className="panel solutions-panel">
      <h3>💡 Recommended Solutions</h3>
      <div className="solutions-list">
        {solutions.map((solution, idx) => (
          <div key={idx} className="solution-card">
            <div className="solution-header">
              <span className="solution-rank">#{solution.rank}</span>
              <span className="solution-title">{solution.title}</span>
              <span className={`confidence-badge ${solution.confidence > 85 ? 'high' : solution.confidence > 70 ? 'medium' : 'low'}`}>
                {solution.confidence}% confidence
              </span>
            </div>

            {solution.reasoning && (
              <div className="solution-reasoning">
                <strong>Why:</strong> {solution.reasoning}
              </div>
            )}

            {solution.steps && solution.steps.length > 0 && (
              <div className="solution-steps">
                <strong>Steps:</strong>
                <ol>
                  {solution.steps.map((step, stepIdx) => (
                    <li key={stepIdx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            <button className="btn-apply">Apply Solution</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolutionsPanel;
EOF

cat > src/components/MetricsBar.js << 'EOF'
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

function MetricsBar() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const response = await api.getMetrics();
        setMetrics(response.data);
      } catch (error) {
        console.error('Error loading metrics:', error);
      }
    };

    loadMetrics();
  }, []);

  if (!metrics) return null;

  return (
    <div className="metrics-bar">
      <div className="metric">
        <div className="metric-label">AHT</div>
        <div className="metric-value">{metrics.aht.current}s</div>
        <div className="metric-change positive">↓ {metrics.aht.improvement_percent}%</div>
      </div>
      <div className="metric">
        <div className="metric-label">FCR</div>
        <div className="metric-value">{metrics.fcr.current}%</div>
        <div className="metric-change positive">↑ {metrics.fcr.improvement_points}pts</div>
      </div>
      <div className="metric">
        <div className="metric-label">CSAT</div>
        <div className="metric-value">{metrics.csat.current}%</div>
        <div className="metric-change positive">↑ {metrics.csat.improvement_points}pts</div>
      </div>
      <div className="metric">
        <div className="metric-label">Accuracy</div>
        <div className="metric-value">{metrics.solution_accuracy}%</div>
      </div>
    </div>
  );
}

export default MetricsBar;
EOF

# CSS
cat > src/App.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  background: #f5f7fa;
  color: #333;
}

.App {
  min-height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.app-header h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.header-controls {
  display: flex;
  gap: 1rem;
}

.demo-buttons {
  display: flex;
  gap: 1rem;
}

.btn-primary {
  background: white;
  color: #667eea;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.call-indicator {
  background: rgba(255,255,255,0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.recording-dot {
  width: 12px;
  height: 12px;
  background: #ff4444;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.metrics-bar {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.metric {
  text-align: center;
}

.metric-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 600;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0.25rem 0;
}

.metric-change {
  font-size: 0.875rem;
  font-weight: 600;
}

.metric-change.positive {
  color: #10b981;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 320px 1fr 400px;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  max-width: 1800px;
  margin: 0 auto;
}

.panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.panel h3 {
  font-size: 1.125rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.panel h4 {
  font-size: 0.875rem;
  text-transform: uppercase;
  color: #6b7280;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.no-data {
  color: #9ca3af;
  font-style: italic;
  padding: 2rem;
  text-align: center;
}

/* Customer Panel */
.customer-panel {
  height: fit-content;
  position: sticky;
  top: 1.5rem;
}

.customer-info, .plan-info, .device-info, .billing-info {
  font-size: 0.875rem;
}

.info-row {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  color: #6b7280;
  margin-right: 0.5rem;
}

.info-row.highlight {
  background: #fef3c7;
  padding: 0.75rem;
  border-radius: 6px;
  margin: 0.5rem 0;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status.active {
  background: #d1fae5;
  color: #065f46;
}

.status.unpaid {
  background: #fee2e2;
  color: #991b1b;
}

/* Transcript Panel */
.transcript-panel {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.live-indicator {
  color: #ef4444;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.transcript-container {
  flex: 1;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: #f9fafb;
}

.transcript-line {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.transcript-line.agent {
  background: #dbeafe;
  border-left: 3px solid #3b82f6;
}

.transcript-line.customer {
  background: #fce7f3;
  border-left: 3px solid #ec4899;
}

.transcript-line .timestamp {
  color: #6b7280;
  font-size: 0.75rem;
  margin-right: 0.5rem;
}

.transcript-line .speaker {
  font-weight: 600;
  margin-right: 0.5rem;
}

.transcript-line .text {
  color: #1f2937;
}

/* AI Insights */
.ai-insights-panel {
  margin-top: 1.5rem;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.insight-card {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.insight-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.insight-value {
  font-size: 1.25rem;
  font-weight: 700;
}

.insight-value.category {
  color: #8b5cf6;
}

.insight-value.sentiment.frustrated {
  color: #ef4444;
}

.insight-value.sentiment.angry {
  color: #dc2626;
}

.insight-value.sentiment.satisfied {
  color: #10b981;
}

.insight-value.urgency.high {
  color: #ef4444;
}

.insight-value.urgency.medium {
  color: #f59e0b;
}

.key-facts {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.key-facts ul {
  list-style-position: inside;
  font-size: 0.875rem;
}

.key-facts li {
  padding: 0.25rem 0;
}

/* Solutions Panel */
.solutions-panel {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  position: sticky;
  top: 1.5rem;
}

.solutions-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.solution-card {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s;
}

.solution-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.solution-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.solution-rank {
  background: #667eea;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.solution-title {
  flex: 1;
  font-weight: 600;
  color: #1f2937;
}

.confidence-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.confidence-badge.high {
  background: #d1fae5;
  color: #065f46;
}

.confidence-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.confidence-badge.low {
  background: #fee2e2;
  color: #991b1b;
}

.solution-reasoning {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 6px;
}

.solution-steps {
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.solution-steps ol {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}

.solution-steps li {
  padding: 0.25rem 0;
  color: #4b5563;
}

.btn-apply {
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-apply:hover {
  background: #5568d3;
  transform: translateY(-1px);
}

@media (max-width: 1400px) {
  .dashboard-grid {
    grid-template-columns: 280px 1fr 350px;
  }
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .customer-panel, .solutions-panel {
    position: relative;
    top: 0;
    max-height: none;
  }
}
EOF

# index.js
cat > src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

echo "✅ Frontend files created!"
echo ""
echo "Next steps:"
echo "1. npm install"
echo "2. npm start"
