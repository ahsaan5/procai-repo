import React from 'react';

function CallDetailPanel({ call, onClose, onIntervene }) {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'SATISFIED': return '#9DC123';
      case 'NEUTRAL': return '#FFA500';
      case 'FRUSTRATED': return '#FF8C00';
      case 'ANGRY': return '#DC3545';
      default: return '#6C757D';
    }
  };

  return (
    <div className="call-detail-overlay" onClick={onClose}>
      <div className="call-detail-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="detail-panel-header">
          <div>
            <h2>{call.customer_name}</h2>
            <p className="detail-subtitle">{call.call_id} • {call.issue_category}</p>
          </div>
          <button onClick={onClose} className="btn-close-panel">×</button>
        </div>

        {/* Content */}
        <div className="detail-panel-content">
          {/* Customer Profile */}
          <section className="detail-section">
            <h3>👤 Customer Profile</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Customer ID:</span>
                <span className="detail-value">{call.customer_id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{call.customer_details.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Plan:</span>
                <span className="detail-value">{call.customer_details.plan}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Monthly Value:</span>
                <span className="detail-value">${call.customer_details.monthly_value}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tenure:</span>
                <span className="detail-value">{call.customer_details.tenure_months} months</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Lifetime Value:</span>
                <span className="detail-value highlight">${call.customer_details.ltv.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Payment History:</span>
                <span className="detail-value success">{call.customer_details.payment_history}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Zip Code:</span>
                <span className="detail-value">{call.customer_details.zip_code}</span>
              </div>
            </div>
          </section>

          {/* Issue Details */}
          <section className="detail-section">
            <h3>⚠️ Issue Details</h3>
            <div className="issue-box">
              <div className="issue-type">
                <span className="issue-badge">{call.issue_details.type}</span>
                <span className={`severity-badge ${call.issue_details.severity.toLowerCase()}`}>
                  {call.issue_details.severity}
                </span>
              </div>
              <p className="issue-description">{call.issue_details.description}</p>
              {call.issue_details.business_impact && (
                <div className="business-impact">
                  <strong>Business Impact:</strong> {call.issue_details.business_impact}
                </div>
              )}
              {call.issue_details.tower_status && (
                <div className="tower-status">
                  <strong>Status:</strong> {call.issue_details.tower_status}
                </div>
              )}
            </div>
          </section>

          {/* Sentiment Timeline */}
          <section className="detail-section">
            <h3>📊 Sentiment Timeline</h3>
            <div className="sentiment-timeline">
              {call.sentiment_history.map((point, index) => (
                <div key={index} className="timeline-point">
                  <div className="timeline-time">{point.time}</div>
                  <div
                    className="timeline-bar"
                    style={{
                      height: `${point.score}%`,
                      backgroundColor: getSentimentColor(point.sentiment)
                    }}
                  ></div>
                  <div className="timeline-sentiment">{point.sentiment}</div>
                </div>
              ))}
            </div>
            <div className="timeline-legend">
              <span className="legend-start">Call Start</span>
              <span className="legend-end">Current</span>
            </div>
          </section>

          {/* Transcript Summary */}
          <section className="detail-section">
            <h3>💬 Transcript Summary</h3>
            <p className="transcript-summary">{call.transcript_summary}</p>
          </section>

          {/* Key Phrases */}
          <section className="detail-section">
            <h3>🔑 Key Phrases</h3>
            <div className="key-phrases">
              {call.key_phrases.map((phrase, index) => (
                <div key={index} className="key-phrase">
                  "{phrase}"
                </div>
              ))}
            </div>
          </section>

          {/* Flag Information (if flagged) */}
          {call.is_flagged && (
            <section className="detail-section flagged-section">
              <h3>🚩 Alert Information</h3>
              <div className="flag-info">
                <div className="flag-info-item">
                  <span className="flag-info-label">Flagged At:</span>
                  <span className="flag-info-value">{call.flagged_at}</span>
                </div>
                <div className="flag-reason-box">
                  <strong>Reason:</strong> {call.flag_reason}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Footer Actions */}
        <div className="detail-panel-footer">
          <button onClick={onClose} className="btn-cancel">
            Close
          </button>
          {call.is_flagged && (
            <button onClick={onIntervene} className="btn-intervene-primary">
              🚨 Join Call & Intervene
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CallDetailPanel;
