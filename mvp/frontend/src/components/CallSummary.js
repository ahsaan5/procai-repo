import React from 'react';

function CallSummary({ summary, onClose }) {
  if (!summary) return null;

  return (
    <div className="call-summary-overlay">
      <div className="call-summary-modal">
        <div className="summary-header">
          <h2>📋 Call Summary - AI Generated</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="summary-content-grid">
          {/* Left Column */}
          <div className="summary-section">
            <h3>📞 Call Information</h3>
            <div className="summary-item">
              <span className="summary-label">Call ID:</span>
              <span className="summary-value">{summary.callId}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Customer:</span>
              <span className="summary-value">{summary.customerName}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Customer ID:</span>
              <span className="summary-value">{summary.customerId}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Duration:</span>
              <span className="summary-value">{summary.duration}</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="summary-section">
            <h3>🎯 Issue Details</h3>
            <div className="summary-item">
              <span className="summary-label">Category:</span>
              <span className="summary-value category-badge">{summary.issue_category}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Details:</span>
              <span className="summary-value">{summary.issue_details}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Sentiment:</span>
              <span className={`summary-value sentiment-badge ${summary.final_sentiment.toLowerCase()}`}>
                {summary.final_sentiment === 'SATISFIED' ? '😊' : '😐'} {summary.final_sentiment}
              </span>
            </div>
          </div>
        </div>

        {/* Full Width Sections */}
        <div className="summary-section full-width">
          <h3>✅ Resolution & Actions</h3>
          <div className="resolution-box">
            <strong>Resolution Applied:</strong>
            <p>{summary.resolution}</p>
          </div>

          <div className="actions-list">
            <strong>Actions Taken:</strong>
            <ul>
              {summary.actions_taken.map((action, idx) => (
                <li key={idx}>
                  <span className="action-icon">✓</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="summary-section full-width">
          <h3>💬 Customer Feedback</h3>
          <div className="feedback-box">
            <p className="feedback-text">"{summary.customer_feedback}"</p>
          </div>
        </div>

        <div className="summary-section full-width">
          <h3>📝 Next Steps & Agent Notes</h3>
          <div className="next-steps-box">
            <div className="next-step-item">
              <strong>Next Steps:</strong>
              <p>{summary.next_steps}</p>
            </div>
            <div className="agent-notes-item">
              <strong>Agent Notes:</strong>
              <p>{summary.agent_notes}</p>
            </div>
          </div>
        </div>

        <div className="summary-footer">
          <button className="btn-close-summary" onClick={onClose}>
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
}

export default CallSummary;
