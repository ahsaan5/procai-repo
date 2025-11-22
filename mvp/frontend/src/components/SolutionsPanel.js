import React, { useState } from 'react';

function SolutionsPanel({ solutions, onSelectSolution, callActive, appliedSolution }) {
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  if (!solutions || solutions.length === 0) {
    return (
      <div className="panel solutions-panel">
        <h3>💡 AI-Recommended Solutions</h3>
        {callActive ? (
          <div className="analyzing-message">
            <div className="loading-spinner"></div>
            <p>Analyzing call context and generating solution recommendations...</p>
            <p className="eta-text">Solutions will appear within 8 seconds</p>
          </div>
        ) : (
          <p className="no-data">Solutions will appear here as the call progresses...</p>
        )}
      </div>
    );
  }

  const handleSelectSolution = (solution, idx) => {
    setSelectedSolution(idx);
    setIsApplying(true);
    if (onSelectSolution) {
      onSelectSolution(solution);
    }
  };

  return (
    <div className="panel solutions-panel">
      <h3>💡 AI-Recommended Solutions</h3>
      <p className="instruction-text">
        <span className="ai-badge">🤖 AI-Generated</span> Click on a solution to apply it
      </p>

      {/* Success message when solution is applied */}
      {appliedSolution && (
        <div className="solution-applied-banner">
          <span className="success-icon">✓</span>
          <div className="success-message">
            <strong>Successfully Applied!</strong>
            <p>{appliedSolution.title}</p>
          </div>
        </div>
      )}

      <div className="solutions-list">
        {solutions.map((solution, idx) => (
          <div
            key={idx}
            className={`solution-card ${selectedSolution === idx ? 'selected' : ''} ${appliedSolution && appliedSolution.resolution_id === solution.resolution_id ? 'applied' : ''}`}
            onClick={() => !appliedSolution && handleSelectSolution(solution, idx)}
            style={{ cursor: appliedSolution ? 'default' : 'pointer' }}
          >
            <div className="solution-header">
              <span className="solution-rank">#{solution.rank || idx + 1}</span>
              <span className="solution-title">{solution.title}</span>
              <span className={`confidence-badge ${solution.confidence > 85 ? 'high' : solution.confidence > 70 ? 'medium' : 'low'}`}>
                {solution.confidence}% match
              </span>
            </div>

            <div className="solution-description">
              {solution.description}
            </div>

            {selectedSolution === idx && !appliedSolution && isApplying && (
              <div className="applying-indicator">
                <div className="mini-spinner"></div>
                <span>AI is applying this solution...</span>
              </div>
            )}

            {appliedSolution && appliedSolution.resolution_id === solution.resolution_id && (
              <div className="applied-indicator">
                <span className="checkmark">✓</span> Solution Applied Successfully
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SolutionsPanel;
