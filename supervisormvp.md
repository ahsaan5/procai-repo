# Supervisor Screen MVP - Minimal Viable Demo

**Goal:** Create the simplest possible demo that showcases the supervisor intervention concept in < 5 hours of work.

**Status:** Ready to Build
**Demo Duration:** 30 seconds
**Complexity:** Low - No WebSocket, minimal backend changes

---

## Table of Contents

1. [MVP Philosophy](#mvp-philosophy)
2. [What's In (Core Features)](#whats-in-core-features)
3. [What's Out (Future Enhancements)](#whats-out-future-enhancements)
4. [Implementation Plan](#implementation-plan)
5. [File Structure](#file-structure)
6. [Step-by-Step Build Guide](#step-by-step-build-guide)
7. [Demo Script](#demo-script)
8. [Testing](#testing)

---

## MVP Philosophy

**Core Principle:** Show, don't build.

The MVP focuses on **demonstrating the concept** with minimal code:
- ✅ Static demo data (no real-time updates)
- ✅ Click-through flow (manual progression)
- ✅ Single call scenario (network outage)
- ✅ Pre-scripted intervention (no dynamic logic)
- ✅ Frontend-only changes (minimal backend)

**Why This Works:**
- Can be built in 3-5 hours
- Shows full intervention workflow
- Impressive visual demo
- Easy to iterate based on feedback
- No complex state management or WebSockets

---

## What's In (Core Features)

### ✅ Feature 1: Static Supervisor Dashboard

**What it shows:**
- Grid of 3 active call cards
- Each card displays:
  - Agent + customer name
  - Sentiment emoji (😠 for flagged call)
  - Risk score badge
  - "Review Call" button

**Implementation:**
- Single React component: `SupervisorDashboard.js`
- Hardcoded 3-call array in component state
- No API calls - just JSON in the component

**Effort:** 1 hour

---

### ✅ Feature 2: Call Detail Panel (Slide-in)

**What it shows:**
- Clicks "Review Call" on flagged call
- Right panel slides in showing:
  - Customer: Maria Rodriguez (Premium, 2+ years)
  - Issue: Network outage - 3+ hours
  - Current sentiment: 😠 ANGRY
  - Risk score: 85/100
  - "Join Call" button

**Implementation:**
- Component: `CallDetailPanel.js`
- Triggered by clicking call card
- Shows hardcoded details for Maria Rodriguez call
- CSS slide-in animation

**Effort:** 1 hour

---

### ✅ Feature 3: Intervention Modal

**What it shows:**
- Clicks "Join Call"
- Modal overlays screen with:
  - **AI-Recommended Actions** (4 steps with scripts)
  - **Expected Outcome** (sentiment recovery)
  - "Apply Resolution" button

**Implementation:**
- Component: `InterventionModal.js`
- Full-screen modal with backdrop
- Hardcoded 4-step resolution guide
- Apply button triggers success

**Effort:** 1.5 hours

---

### ✅ Feature 4: Success State

**What it shows:**
- Clicks "Apply Resolution"
- Modal shows success animation
- Returns to dashboard
- Flagged call now shows:
  - 😊 SATISFIED
  - Risk score: 25/100
  - Green "Resolved" badge

**Implementation:**
- Update call card state on button click
- Simple state toggle (flagged → resolved)
- CSS transition for sentiment change

**Effort:** 0.5 hours

---

### ✅ Feature 5: Entry Point

**What it shows:**
- Button in existing agent dashboard: "🎯 View Supervisor Dashboard"
- Clicks button → navigates to supervisor view
- Supervisor view has "← Back to Agent View" button

**Implementation:**
- Add button to existing `App.js`
- Use React state to toggle view: `showSupervisor`
- No routing needed - just conditional rendering

**Effort:** 0.5 hours

---

## What's Out (Future Enhancements)

### ❌ NOT in MVP (Save for v2):

1. **Real-time Updates**
   - No WebSocket
   - No polling
   - No live sentiment changes
   - Static demo only

2. **Multiple Call Scenarios**
   - Only 1 demo scenario (network outage)
   - Other 2 calls are "filler" (can't interact)

3. **Backend Changes**
   - No new API endpoints
   - No supervisor routes
   - Pure frontend demo

4. **Metrics Dashboard**
   - No team metrics bar
   - No FCR/AHT tracking
   - Focus on single intervention only

5. **Auto-play Demo**
   - Manual click-through only
   - No timed events
   - User controls progression

6. **Sentiment Timeline Graph**
   - No historical trend visualization
   - Just current sentiment state

7. **Multiple Agents**
   - Only shows 3 calls
   - No agent filtering or search

8. **Intervention History**
   - No logging of past interventions
   - One-time demo

---

## Implementation Plan

### Phase 1: Setup (15 min)

```bash
cd mvp/frontend/src/components
mkdir supervisor
cd supervisor
```

**Files to create:**
1. `SupervisorDashboard.js`
2. `CallDetailPanel.js`
3. `InterventionModal.js`

---

### Phase 2: Hardcoded Demo Data (30 min)

**File: `mvp/frontend/src/supervisorDemoData.js`**

```javascript
export const SUPERVISOR_DEMO_CALLS = [
  {
    call_id: "CALL-SUPER-001",
    agent_name: "Jessica Chen",
    customer_name: "John Smith",
    issue_category: "Billing Dispute",
    sentiment_emoji: "😐",
    sentiment_label: "NEUTRAL",
    risk_score: 25,
    is_flagged: false,
    status: "in_progress"
  },
  {
    call_id: "CALL-002",
    agent_name: "Sarah Mitchell",
    customer_name: "Maria Rodriguez",
    issue_category: "Network Outage",
    sentiment_emoji: "😠",
    sentiment_label: "ANGRY",
    risk_score: 85,
    is_flagged: true,
    status: "in_progress",
    details: {
      customer: {
        name: "Maria Rodriguez",
        account_type: "Premium Unlimited",
        tenure_months: 26,
        lifetime_value: 2890
      },
      issue: {
        category: "Network Outage",
        details: "Service outage in West Hollywood (90069) for 3+ hours",
        business_impact: "HIGH - Customer works from home, missing client calls"
      },
      ai_actions: [
        {
          priority: 1,
          action: "Acknowledge business impact",
          script: "I understand this outage is affecting your work. That's unacceptable for a premium customer."
        },
        {
          priority: 2,
          action: "Enable WiFi Calling",
          script: "Let's get you back online with WiFi calling while we complete the tower repair."
        },
        {
          priority: 3,
          action: "Apply $35 credit",
          script: "I'm applying a $35 credit to your account for this disruption."
        },
        {
          priority: 4,
          action: "Set restoration alerts",
          script: "I've set up notifications so you'll know when service is restored."
        }
      ],
      expected_outcome: {
        sentiment_change: "ANGRY → SATISFIED",
        risk_reduction: "85 → 25"
      }
    }
  },
  {
    call_id: "CALL-SUPER-003",
    agent_name: "Marcus Johnson",
    customer_name: "David Chen",
    issue_category: "SIM Activation",
    sentiment_emoji: "😊",
    sentiment_label: "SATISFIED",
    risk_score: 15,
    is_flagged: false,
    status: "in_progress"
  }
];
```

---

### Phase 3: Build Components (3 hours)

#### Component 1: SupervisorDashboard.js

**File: `mvp/frontend/src/components/supervisor/SupervisorDashboard.js`**

```javascript
import React, { useState } from 'react';
import { SUPERVISOR_DEMO_CALLS } from '../../supervisorDemoData';
import CallDetailPanel from './CallDetailPanel';
import InterventionModal from './InterventionModal';
import './supervisor.css';

function SupervisorDashboard({ onBackToAgent }) {
  const [calls, setCalls] = useState(SUPERVISOR_DEMO_CALLS);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showIntervention, setShowIntervention] = useState(false);

  const handleReviewCall = (call) => {
    if (call.is_flagged) {
      setSelectedCall(call);
    }
  };

  const handleJoinCall = () => {
    setShowIntervention(true);
  };

  const handleApplyResolution = () => {
    // Update the flagged call to resolved state
    const updatedCalls = calls.map(call => {
      if (call.call_id === selectedCall.call_id) {
        return {
          ...call,
          sentiment_emoji: "😊",
          sentiment_label: "SATISFIED",
          risk_score: 25,
          is_flagged: false,
          status: "resolved"
        };
      }
      return call;
    });

    setCalls(updatedCalls);
    setShowIntervention(false);
    setSelectedCall(null);
  };

  const handleCloseDetail = () => {
    setSelectedCall(null);
  };

  const handleCloseIntervention = () => {
    setShowIntervention(false);
  };

  return (
    <div className="supervisor-app">
      {/* Header */}
      <header className="supervisor-header">
        <div className="header-content">
          <h1>🎯 Supervisor Dashboard</h1>
          <p>Real-time call monitoring and intervention</p>
        </div>
        <button onClick={onBackToAgent} className="btn-back-agent">
          ← Back to Agent View
        </button>
      </header>

      {/* Main Content */}
      <div className="supervisor-content">
        <div className="calls-section">
          <h2>🔴 Live Calls ({calls.length})</h2>
          <div className="call-grid">
            {calls.map(call => (
              <div
                key={call.call_id}
                className={`call-card ${call.is_flagged ? 'flagged' : ''} ${call.status === 'resolved' ? 'resolved' : ''}`}
                onClick={() => handleReviewCall(call)}
              >
                {call.is_flagged && (
                  <div className="flag-banner">
                    🚨 INTERVENTION RECOMMENDED
                  </div>
                )}

                {call.status === 'resolved' && (
                  <div className="resolved-banner">
                    ✅ RESOLVED
                  </div>
                )}

                <div className="card-header">
                  <div className="agent-info">
                    <div className="agent-avatar">👤</div>
                    <div>
                      <div className="agent-name">{call.agent_name}</div>
                      <div className="customer-name">{call.customer_name}</div>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="issue-badge">{call.issue_category}</div>

                  <div className="sentiment-display">
                    <div className="sentiment-emoji">{call.sentiment_emoji}</div>
                    <div className="sentiment-label">{call.sentiment_label}</div>
                  </div>

                  <div className="risk-display">
                    <span className="risk-label">Risk Score</span>
                    <span className={`risk-score risk-${call.risk_score >= 70 ? 'high' : call.risk_score >= 40 ? 'medium' : 'low'}`}>
                      {call.risk_score}/100
                    </span>
                  </div>
                </div>

                <div className="card-footer">
                  {call.is_flagged && (
                    <button className="btn-review-urgent">
                      🔍 Review Now
                    </button>
                  )}
                  {call.status === 'resolved' && (
                    <div className="resolved-message">
                      Intervention successful
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        {selectedCall && !showIntervention && (
          <CallDetailPanel
            call={selectedCall}
            onJoinCall={handleJoinCall}
            onClose={handleCloseDetail}
          />
        )}
      </div>

      {/* Intervention Modal */}
      {showIntervention && selectedCall && (
        <InterventionModal
          call={selectedCall}
          onApply={handleApplyResolution}
          onClose={handleCloseIntervention}
        />
      )}
    </div>
  );
}

export default SupervisorDashboard;
```

---

#### Component 2: CallDetailPanel.js

**File: `mvp/frontend/src/components/supervisor/CallDetailPanel.js`**

```javascript
import React from 'react';

function CallDetailPanel({ call, onJoinCall, onClose }) {
  const { details } = call;

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <h3>📋 Call Details</h3>
        <button onClick={onClose} className="btn-close">×</button>
      </div>

      <div className="detail-content">
        {/* Customer Info */}
        <div className="detail-section">
          <h4>👤 Customer</h4>
          <div className="info-row">
            <span className="label">Name:</span>
            <span className="value">{details.customer.name}</span>
          </div>
          <div className="info-row">
            <span className="label">Account:</span>
            <span className="value highlight">{details.customer.account_type}</span>
          </div>
          <div className="info-row">
            <span className="label">Tenure:</span>
            <span className="value">{details.customer.tenure_months} months</span>
          </div>
          <div className="info-row">
            <span className="label">LTV:</span>
            <span className="value">${details.customer.lifetime_value.toLocaleString()}</span>
          </div>
        </div>

        {/* Issue Info */}
        <div className="detail-section issue-section">
          <h4>⚠️ Issue</h4>
          <div className="issue-badge">{details.issue.category}</div>
          <p className="issue-details">{details.issue.details}</p>
          <div className="business-impact">
            <strong>Impact:</strong> {details.issue.business_impact}
          </div>
        </div>

        {/* Current State */}
        <div className="detail-section">
          <h4>📊 Current State</h4>
          <div className="state-grid">
            <div className="state-item">
              <span className="state-label">Sentiment</span>
              <span className="state-value sentiment-angry">
                {call.sentiment_emoji} {call.sentiment_label}
              </span>
            </div>
            <div className="state-item">
              <span className="state-label">Risk Score</span>
              <span className="state-value risk-high">{call.risk_score}/100</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button onClick={onJoinCall} className="btn-join-call">
          🎯 Join Call & Apply AI Resolution
        </button>
      </div>
    </div>
  );
}

export default CallDetailPanel;
```

---

#### Component 3: InterventionModal.js

**File: `mvp/frontend/src/components/supervisor/InterventionModal.js`**

```javascript
import React, { useState } from 'react';

function InterventionModal({ call, onApply, onClose }) {
  const [applying, setApplying] = useState(false);
  const { details } = call;

  const handleApply = () => {
    setApplying(true);

    // Simulate applying resolution
    setTimeout(() => {
      onApply();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="intervention-modal">
        {/* Header */}
        <div className="modal-header">
          <h2>🎯 Supervisor Intervention</h2>
          <p>Customer: {details.customer.name} | Agent: {call.agent_name}</p>
        </div>

        {/* AI Recommended Actions */}
        <div className="modal-body">
          <div className="section">
            <h3>🤖 AI-Recommended Actions</h3>
            <p className="section-subtitle">Follow these steps to resolve the issue</p>

            <div className="action-steps">
              {details.ai_actions.map((action, idx) => (
                <div key={idx} className="action-step">
                  <div className="step-number">{action.priority}</div>
                  <div className="step-content">
                    <div className="step-title">{action.action}</div>
                    <div className="step-script">
                      <strong>Script:</strong>
                      <p>"{action.script}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="section outcome-section">
            <h3>✨ Expected Outcome</h3>
            <div className="outcome-grid">
              <div className="outcome-item">
                <span className="outcome-label">Sentiment</span>
                <span className="outcome-value">{details.expected_outcome.sentiment_change}</span>
              </div>
              <div className="outcome-item">
                <span className="outcome-label">Risk Score</span>
                <span className="outcome-value">{details.expected_outcome.risk_reduction}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <button
            onClick={handleApply}
            className="btn-apply"
            disabled={applying}
          >
            {applying ? (
              <>
                <span className="spinner"></span>
                Applying Resolution...
              </>
            ) : (
              <>✅ Apply Resolution & Exit</>
            )}
          </button>
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterventionModal;
```

---

### Phase 4: Styling (1 hour)

**File: `mvp/frontend/src/components/supervisor/supervisor.css`**

```css
/* ===== SUPERVISOR DASHBOARD ===== */

.supervisor-app {
  min-height: 100vh;
  background: #f5f7fa;
}

.supervisor-header {
  background: linear-gradient(135deg, #1BA8C4 0%, #9DC123 100%);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  margin: 0 0 0.25rem 0;
  font-size: 1.75rem;
}

.header-content p {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

.btn-back-agent {
  background: white;
  color: #1BA8C4;
  border: 2px solid white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back-agent:hover {
  background: #f0f9ff;
  transform: translateY(-2px);
}

/* Main Content */
.supervisor-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.calls-section h2 {
  margin: 0 0 1.5rem 0;
  color: #1f2937;
}

/* Call Grid */
.call-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.call-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.call-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.call-card.flagged {
  border: 3px solid #dc2626;
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
  animation: cardPulse 2s infinite;
}

@keyframes cardPulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1); }
  50% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0.2); }
}

.call-card.resolved {
  border-color: #10b981;
  opacity: 0.8;
}

.flag-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-weight: 700;
  font-size: 0.75rem;
  animation: flagPulse 1.5s infinite;
}

@keyframes flagPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}

.resolved-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-weight: 700;
  font-size: 0.75rem;
}

.card-header {
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
  margin-top: 0.5rem;
}

.agent-info {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.agent-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1BA8C4 0%, #9DC123 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.agent-name {
  font-weight: 700;
  color: #1f2937;
}

.customer-name {
  font-size: 0.875rem;
  color: #6b7280;
}

.card-body {
  padding: 1rem 0;
}

.issue-badge {
  background: linear-gradient(135deg, #1BA8C4 0%, #9DC123 100%);
  color: white;
  padding: 0.4rem 0.9rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.sentiment-display {
  text-align: center;
  padding: 1rem 0;
}

.sentiment-emoji {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.sentiment-label {
  font-weight: 700;
  font-size: 0.875rem;
  color: #4b5563;
}

.risk-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-top: 1rem;
}

.risk-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
}

.risk-score {
  font-weight: 700;
  font-size: 1.125rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.risk-score.risk-high {
  background: #fee2e2;
  color: #991b1b;
}

.risk-score.risk-medium {
  background: #fef3c7;
  color: #92400e;
}

.risk-score.risk-low {
  background: #d1fae5;
  color: #065f46;
}

.card-footer {
  padding-top: 1rem;
  border-top: 2px solid #f3f4f6;
}

.btn-review-urgent {
  width: 100%;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-review-urgent:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.resolved-message {
  text-align: center;
  color: #10b981;
  font-weight: 600;
  font-size: 0.875rem;
}

/* ===== DETAIL PANEL ===== */

.detail-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.detail-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.btn-close {
  background: #f9fafb;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s;
}

.btn-close:hover {
  background: #fee2e2;
  color: #dc2626;
  transform: rotate(90deg);
}

.detail-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
}

.detail-section:last-of-type {
  border-bottom: none;
}

.detail-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: #1f2937;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.info-row .label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 600;
}

.info-row .value {
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 600;
}

.info-row .value.highlight {
  color: #1BA8C4;
}

.issue-section {
  background: #fef2f2;
  padding: 1rem;
  border-radius: 8px;
}

.issue-details {
  margin: 0.75rem 0;
  font-size: 0.875rem;
  color: #1f2937;
  line-height: 1.6;
}

.business-impact {
  background: white;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #dc2626;
  font-weight: 600;
}

.state-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.state-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
}

.state-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
}

.state-value {
  font-size: 1.125rem;
  font-weight: 700;
}

.state-value.sentiment-angry {
  color: #dc2626;
}

.state-value.risk-high {
  color: #dc2626;
}

.btn-join-call {
  width: 100%;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;
}

.btn-join-call:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

/* ===== INTERVENTION MODAL ===== */

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.intervention-modal {
  background: white;
  border-radius: 16px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 16px 16px 0 0;
}

.modal-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.modal-header p {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.95;
}

.modal-body {
  padding: 2rem;
}

.section {
  margin-bottom: 2rem;
}

.section h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: #1f2937;
}

.section-subtitle {
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.action-steps {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.action-step {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: #f9fafb;
  border-radius: 10px;
  border-left: 4px solid #1BA8C4;
}

.step-number {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #1BA8C4 0%, #9DC123 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.step-script {
  background: white;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
}

.step-script strong {
  display: block;
  color: #6b7280;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.step-script p {
  margin: 0;
  color: #1f2937;
  font-style: italic;
  line-height: 1.5;
}

.outcome-section {
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid #10b981;
}

.outcome-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.outcome-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
}

.outcome-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
}

.outcome-value {
  font-size: 1rem;
  color: #10b981;
  font-weight: 700;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
}

.btn-apply {
  flex: 2;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.btn-apply:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-apply:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  flex: 1;
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 1024px) {
  .supervisor-content {
    grid-template-columns: 1fr;
  }

  .detail-panel {
    position: relative;
    top: 0;
    max-height: none;
    margin-top: 2rem;
  }
}
```

---

### Phase 5: Integration (30 min)

**Modify: `mvp/frontend/src/App.js`**

Add state toggle and button:

```javascript
import React, { useState } from 'react';
import SupervisorDashboard from './components/supervisor/SupervisorDashboard';
// ... existing imports

function App() {
  const [showSupervisor, setShowSupervisor] = useState(false);
  // ... existing state

  if (showSupervisor) {
    return (
      <SupervisorDashboard
        onBackToAgent={() => setShowSupervisor(false)}
      />
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        {/* ... existing header content ... */}

        {/* ADD THIS BUTTON */}
        <button
          onClick={() => setShowSupervisor(true)}
          className="btn-supervisor"
        >
          🎯 View Supervisor Dashboard
        </button>
      </header>

      {/* ... rest of existing app ... */}
    </div>
  );
}
```

**Add to: `mvp/frontend/src/App.css`**

```css
.btn-supervisor {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-supervisor:hover {
  background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}
```

---

## File Structure

```
mvp/
├── frontend/
│   ├── src/
│   │   ├── App.js                           # Modified: Add supervisor toggle
│   │   ├── App.css                          # Modified: Add supervisor button style
│   │   ├── supervisorDemoData.js            # NEW: Hardcoded demo data
│   │   └── components/
│   │       └── supervisor/                  # NEW FOLDER
│   │           ├── SupervisorDashboard.js   # NEW: Main component
│   │           ├── CallDetailPanel.js       # NEW: Detail sidebar
│   │           ├── InterventionModal.js     # NEW: Intervention modal
│   │           └── supervisor.css           # NEW: All styles
```

**Total New Files:** 4
**Modified Files:** 2
**Lines of Code:** ~800 lines

---

## Step-by-Step Build Guide

### Step 1: Create Folder Structure (2 min)

```bash
cd mvp/frontend/src
mkdir -p components/supervisor
```

### Step 2: Create Data File (5 min)

Copy the `supervisorDemoData.js` content above into:
```
mvp/frontend/src/supervisorDemoData.js
```

### Step 3: Create Components (2 hours)

1. Create `SupervisorDashboard.js` (45 min)
2. Create `CallDetailPanel.js` (30 min)
3. Create `InterventionModal.js` (45 min)

### Step 4: Create Styles (1 hour)

Create `supervisor.css` with all styling.

### Step 5: Integrate into App (15 min)

1. Add `showSupervisor` state to `App.js`
2. Add conditional rendering
3. Add "View Supervisor Dashboard" button
4. Add button styling to `App.css`

### Step 6: Test (30 min)

1. Start frontend: `npm start`
2. Click "View Supervisor Dashboard"
3. See 3 call cards (1 flagged)
4. Click "Review Now" on flagged call
5. Detail panel slides in
6. Click "Join Call & Apply AI Resolution"
7. Modal appears with 4-step guide
8. Click "Apply Resolution & Exit"
9. Loading spinner appears
10. Returns to dashboard
11. Call now shows 😊 SATISFIED with green badge

---

## Demo Script

### 30-Second Demo Walkthrough

**Setup:**
- Have browser open to `http://localhost:3000`
- Agent dashboard visible

**Demo Flow:**

**[0:00-0:05] Introduction**
> "Now let's see how supervisors monitor calls in real-time with ProcAI."
> *Clicks "🎯 View Supervisor Dashboard" button*

**[0:05-0:10] Dashboard Overview**
> "Supervisor sees all active calls. Notice this call is flagged red - high risk."
> *Points to flagged call card with 😠 emoji and risk score 85/100*

**[0:10-0:15] Review Call**
> "Let's review it."
> *Clicks "Review Now" button on flagged call*
> *Detail panel slides in*

**[0:15-0:20] Context**
> "Maria Rodriguez, premium customer for 2+ years. Network outage affecting her work. Currently ANGRY. This is business-critical."

**[0:20-0:25] Join Intervention**
> "Supervisor decides to join."
> *Clicks "Join Call & Apply AI Resolution"*
> *Modal appears*

**[0:25-0:30] AI Guidance**
> "ProcAI provides 4 recommended actions with scripts."
> *Scrolls through actions*
> "Expected outcome: ANGRY → SATISFIED, risk drops from 85 to 25."
> *Clicks "Apply Resolution & Exit"*
> *Loading spinner*

**[0:30-0:35] Success**
> "Done! Call now shows SATISFIED, risk score dropped, intervention successful."
> *Points to resolved call with green badge*

**Total: 30-35 seconds**

---

## Testing

### Manual Test Checklist

**Pre-Demo:**
- [ ] Frontend running on localhost:3000
- [ ] No console errors
- [ ] "View Supervisor Dashboard" button visible

**Dashboard:**
- [ ] 3 call cards displayed
- [ ] 1 card has red border and flag banner
- [ ] Flagged card shows 😠 emoji
- [ ] Risk score shows 85/100
- [ ] "Review Now" button visible

**Detail Panel:**
- [ ] Clicking flagged card opens detail panel
- [ ] Panel slides in from right
- [ ] Customer info displays correctly
- [ ] Issue details show
- [ ] Current state shows ANGRY sentiment
- [ ] "Join Call" button visible
- [ ] Close (×) button works

**Intervention Modal:**
- [ ] Clicking "Join Call" opens modal
- [ ] Modal overlays screen
- [ ] 4 action steps display
- [ ] Each step has number, title, and script
- [ ] Expected outcome section shows
- [ ] "Apply Resolution" button visible
- [ ] Cancel button works

**Resolution:**
- [ ] Clicking "Apply" shows spinner
- [ ] After 1.5s, modal closes
- [ ] Returns to dashboard
- [ ] Flagged call now shows 😊 emoji
- [ ] Risk score now shows 25/100
- [ ] Green "RESOLVED" banner visible
- [ ] "Intervention successful" message shows

**Navigation:**
- [ ] "Back to Agent View" button works
- [ ] Returns to normal agent dashboard
- [ ] Can toggle back to supervisor view

### Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)

### Responsive Test

- [ ] Desktop (1920px) - side-by-side layout
- [ ] Laptop (1366px) - stacked layout
- [ ] Tablet (768px) - single column

---

## What You Get

### ✅ MVP Delivers:

1. **Visual Impact**
   - Professional supervisor dashboard
   - Eye-catching flagged call animation
   - Smooth transitions and modals

2. **Complete User Flow**
   - Browse calls → Review → Intervene → Resolve
   - Full 4-step intervention process
   - Success state feedback

3. **Concept Validation**
   - Shows supervisor monitoring
   - Demonstrates AI-guided intervention
   - Proves sentiment recovery works

4. **Presentation Ready**
   - 30-second demo script
   - Repeatable (can demo multiple times)
   - Impressive to stakeholders

### ❌ What's NOT Included (v2 Features):

- Real-time updates
- Multiple call scenarios
- Backend integration
- Metrics tracking
- Auto-play demo
- Sentiment timeline graphs

---

## Time Estimate

| Phase | Task | Time |
|-------|------|------|
| 1 | Setup folders | 2 min |
| 2 | Create demo data | 5 min |
| 3 | SupervisorDashboard component | 45 min |
| 3 | CallDetailPanel component | 30 min |
| 3 | InterventionModal component | 45 min |
| 4 | Create supervisor.css | 1 hour |
| 5 | Integrate into App.js | 15 min |
| 6 | Testing and polish | 30 min |
| **TOTAL** | | **~4 hours** |

---

## Success Criteria

### MVP is successful if:

✅ Stakeholders understand the supervisor intervention concept
✅ Demo completes without errors
✅ Visual quality matches rest of ProcAI app
✅ Can be demoed repeatedly in meetings
✅ Takes less than 1 minute to show

### MVP is ready to extend if:

✅ Positive feedback from demo
✅ Requests for additional features
✅ Interest in seeing real-time version

---

## Next Steps After MVP

Once MVP is validated, prioritize these enhancements:

**v2.0 Enhancements (Pick 1-2):**
1. Add 2 more demo call scenarios
2. Implement metrics bar at top
3. Add sentiment timeline graph
4. Create auto-play demo mode
5. Add intervention history panel

**v3.0 Production Features:**
- Real WebSocket integration
- Backend supervisor API
- Database logging
- Multiple supervisor support
- Advanced filtering and search

---

## Conclusion

This MVP provides:

✅ **4-hour build time** (vs 20+ hours for full implementation)
✅ **30-second impressive demo** (vs complex multi-minute walkthrough)
✅ **Zero backend changes** (vs new API endpoints and WebSocket)
✅ **Immediate stakeholder value** (vs waiting weeks for full build)
✅ **Easy iteration** (add features based on feedback)

**Start here. Ship fast. Get feedback. Iterate.**

---

**Ready to build? Start with Phase 1 and work through sequentially. Each phase builds on the previous one.**

**Questions? Refer back to supervisorscope.md for the full feature-complete specification.**

🚀 **Let's ship this MVP!**
