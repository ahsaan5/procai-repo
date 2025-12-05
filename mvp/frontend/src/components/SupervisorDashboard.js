import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import CallDetailPanel from './CallDetailPanel';
import InterventionModal from './InterventionModal';

function SupervisorDashboard({ onBackToAgent }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [showInterventionModal, setShowInterventionModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await api.getSupervisorDashboard();
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading supervisor dashboard:', error);
      setLoading(false);
    }
  };

  const handleViewDetails = async (call) => {
    try {
      const response = await api.getCallDetails(call.call_id);
      setSelectedCall(response.data.data);
      setShowDetailPanel(true);
    } catch (error) {
      console.error('Error loading call details:', error);
    }
  };

  const handleIntervene = () => {
    setShowDetailPanel(false);
    setShowInterventionModal(true);
  };

  const handleInterventionComplete = () => {
    setShowInterventionModal(false);
    setSelectedCall(null);
    loadDashboard(); // Refresh dashboard to show updated metrics
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'SATISFIED': return '#9DC123';
      case 'NEUTRAL': return '#FFA500';
      case 'FRUSTRATED': return '#FF8C00';
      case 'ANGRY': return '#DC3545';
      default: return '#6C757D';
    }
  };

  const getRiskColor = (score) => {
    if (score >= 70) return '#DC3545';
    if (score >= 40) return '#FFA500';
    return '#9DC123';
  };

  if (loading) {
    return (
      <div className="supervisor-dashboard">
        <div className="loading-spinner">Loading supervisor dashboard...</div>
      </div>
    );
  }

  const { active_calls, metrics } = dashboardData.data;

  return (
    <div className="supervisor-dashboard">
      {/* Header */}
      <header className="supervisor-header">
        <div className="supervisor-title">
          <h1>👥 Supervisor Dashboard</h1>
          <p className="supervisor-subtitle">Real-time Call Monitoring & Intervention</p>
        </div>
        <button onClick={onBackToAgent} className="btn-back-to-agent">
          ← Back to Agent View
        </button>
      </header>

      {/* Metrics Bar */}
      <div className="supervisor-metrics">
        <div className="metric-card">
          <div className="metric-icon">📞</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.total_active_calls}</div>
            <div className="metric-label">Active Calls</div>
          </div>
        </div>

        <div className="metric-card flagged">
          <div className="metric-icon">🚩</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.flagged_calls}</div>
            <div className="metric-label">Flagged Calls</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.avg_risk_score}</div>
            <div className="metric-label">Avg Risk Score</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">😊</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.avg_sentiment}</div>
            <div className="metric-label">Avg Sentiment</div>
          </div>
        </div>

        <div className="metric-card alert">
          <div className="metric-icon">⚠️</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.high_risk_calls}</div>
            <div className="metric-label">High Risk</div>
          </div>
        </div>
      </div>

      {/* Active Calls Grid */}
      <div className="supervisor-calls-section">
        <h2>Active Calls</h2>
        <div className="supervisor-calls-grid">
          {active_calls.map((call) => (
            <div
              key={call.call_id}
              className={`supervisor-call-card ${call.is_flagged ? 'flagged' : ''}`}
            >
              {call.is_flagged && (
                <div className="flag-badge">
                  <span className="flag-icon">🚩</span>
                  HIGH RISK
                </div>
              )}

              <div className="call-card-header">
                <div className="call-customer">
                  <div className="customer-name">{call.customer_name}</div>
                  <div className="customer-id">{call.customer_id}</div>
                </div>
                <div className="call-duration">
                  {Math.floor(call.call_duration_seconds / 60)}:{(call.call_duration_seconds % 60).toString().padStart(2, '0')}
                </div>
              </div>

              <div className="call-card-body">
                <div className="call-info-row">
                  <span className="label">Agent:</span>
                  <span className="value">{call.agent_name}</span>
                </div>

                <div className="call-info-row">
                  <span className="label">Issue:</span>
                  <span className="value">{call.issue_category}</span>
                </div>

                <div className="call-info-row">
                  <span className="label">Plan:</span>
                  <span className="value">{call.plan}</span>
                </div>

                <div className="call-info-row">
                  <span className="label">LTV:</span>
                  <span className="value">${call.customer_ltv.toLocaleString()}</span>
                </div>

                <div className="sentiment-section">
                  <div className="sentiment-display">
                    <span className="sentiment-emoji" style={{ fontSize: '32px' }}>
                      {call.sentiment_emoji}
                    </span>
                    <div className="sentiment-details">
                      <div
                        className="sentiment-label"
                        style={{ color: getSentimentColor(call.sentiment) }}
                      >
                        {call.sentiment}
                      </div>
                      <div className="sentiment-sublabel">Current Sentiment</div>
                    </div>
                  </div>

                  <div className="risk-score-display">
                    <div
                      className="risk-score-value"
                      style={{ color: getRiskColor(call.risk_score) }}
                    >
                      {call.risk_score}
                    </div>
                    <div className="risk-score-label">Risk Score</div>
                    <div className="risk-score-bar">
                      <div
                        className="risk-score-fill"
                        style={{
                          width: `${call.risk_score}%`,
                          backgroundColor: getRiskColor(call.risk_score)
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="call-card-footer">
                <button
                  onClick={() => handleViewDetails(call)}
                  className="btn-view-details"
                >
                  View Details
                </button>
                {call.is_flagged && (
                  <button
                    onClick={() => {
                      handleViewDetails(call);
                      setTimeout(() => handleIntervene(), 500);
                    }}
                    className="btn-intervene"
                  >
                    🚨 Intervene Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call Detail Panel */}
      {showDetailPanel && selectedCall && (
        <CallDetailPanel
          call={selectedCall}
          onClose={() => {
            setShowDetailPanel(false);
            setSelectedCall(null);
          }}
          onIntervene={handleIntervene}
        />
      )}

      {/* Intervention Modal */}
      {showInterventionModal && selectedCall && (
        <InterventionModal
          call={selectedCall}
          onClose={() => setShowInterventionModal(false)}
          onComplete={handleInterventionComplete}
        />
      )}
    </div>
  );
}

export default SupervisorDashboard;
