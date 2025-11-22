import React from 'react';

function AIInsights({ insights, customer, customInsights }) {
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

      {/* Custom AI-Generated Customer Insights */}
      {customInsights && customInsights.customerInsights && (
        <div className="customer-insights-box ai-generated-insights">
          <h4>
            <span className="ai-insight-badge">🤖 AI-Generated</span>
            Customer Intelligence
          </h4>
          {customInsights.customerInsights.map((insight, idx) => (
            <div
              key={idx}
              className={`customer-insight-item ${insight.type}`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <span className="insight-icon">{insight.icon}</span>
              <span>{insight.text}</span>
            </div>
          ))}
        </div>
      )}

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
