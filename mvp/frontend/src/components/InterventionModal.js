import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { api } from '../services/api';

function InterventionModal({ call, onClose, onComplete }) {
  const [interventionPlan, setInterventionPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [intervening, setIntervening] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const modalContentRef = useRef(null);

  useEffect(() => {
    loadInterventionPlan();
  }, []);

  // Auto-scroll effect - runs after DOM updates
  useLayoutEffect(() => {
    if (!modalContentRef.current || !intervening) return;

    const scrollContainer = modalContentRef.current;

    // Scroll to bottom when steps are completed
    if (shouldScrollToBottom) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
      setShouldScrollToBottom(false);
    }
  }, [currentStep, completedSteps, shouldScrollToBottom, intervening]);

  const loadInterventionPlan = async () => {
    try {
      const response = await api.getInterventionPlan(call.call_id);
      if (response.data.data && response.data.data.available) {
        setInterventionPlan(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading intervention plan:', error);
      setLoading(false);
    }
  };

  const handleStartIntervention = async () => {
    try {
      setIntervening(true);
      await api.initiateIntervention({
        call_id: call.call_id,
        supervisor_id: 'SUP-001',
        supervisor_name: 'Lisa Thompson',
        action: 'join_call'
      });
    } catch (error) {
      console.error('Error starting intervention:', error);
    }
  };

  const handleCompleteStep = async (stepNumber) => {
    try {
      await api.completeInterventionStep({
        call_id: call.call_id,
        step_number: stepNumber,
        completed: true
      });

      setCompletedSteps([...completedSteps, stepNumber]);

      // Auto-advance to next step
      if (stepNumber < interventionPlan.guided_steps.length) {
        setCurrentStep(stepNumber);
        setShouldScrollToBottom(true);
      } else {
        // All steps complete - scroll to bottom to show finish button
        setShouldScrollToBottom(true);
      }
    } catch (error) {
      console.error('Error completing step:', error);
    }
  };

  const handleFinishIntervention = async () => {
    try {
      await api.completeIntervention(call.call_id);
      onComplete();
    } catch (error) {
      console.error('Error completing intervention:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return '#DC3545';
      case 'HIGH': return '#FFA500';
      case 'MEDIUM': return '#FFC107';
      default: return '#6C757D';
    }
  };

  if (loading) {
    return (
      <div className="intervention-modal-overlay">
        <div className="intervention-modal">
          <div className="loading-spinner">Loading intervention plan...</div>
        </div>
      </div>
    );
  }

  if (!interventionPlan || !interventionPlan.available) {
    return (
      <div className="intervention-modal-overlay" onClick={onClose}>
        <div className="intervention-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>No Intervention Plan Available</h2>
            <button onClick={onClose} className="btn-close-modal">×</button>
          </div>
          <div className="modal-content">
            <p>No AI-guided intervention plan is available for this call.</p>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="btn-cancel">Close</button>
          </div>
        </div>
      </div>
    );
  }

  const allStepsComplete = completedSteps.length === interventionPlan.guided_steps.length;

  return (
    <div className="intervention-modal-overlay">
      <div className="intervention-modal">
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2>🚨 AI-Guided Intervention</h2>
            <p className="modal-subtitle">
              {call.customer_name} • {call.call_id}
            </p>
          </div>
          <button onClick={onClose} className="btn-close-modal">×</button>
        </div>

        {/* Scrollable Content */}
        <div className="modal-content" ref={modalContentRef}>
          {/* AI Recommendation Banner */}
          <div className="ai-recommendation-banner">
          <div className="ai-icon">🤖</div>
          <div className="ai-recommendation-content">
            <div className="ai-recommendation-header">
              <span className="ai-label">AI Recommendation</span>
              <span className="ai-confidence">{interventionPlan.confidence}% Confidence</span>
            </div>
            <p className="ai-reasoning">{interventionPlan.reasoning}</p>
            <div className="recommended-action">
              <strong>Recommended Action:</strong> {interventionPlan.recommended_action.replace('_', ' ').toUpperCase()}
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="success-metrics">
          <div className="metric-item">
            <span className="metric-icon">🎯</span>
            <span className="metric-text">
              Target: {interventionPlan.success_metrics.target_sentiment_improvement}
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-icon">⬇️</span>
            <span className="metric-text">
              Risk Reduction: {interventionPlan.success_metrics.target_risk_reduction} points
            </span>
          </div>
          <div className="metric-item">
            <span className="metric-icon">⏱️</span>
            <span className="metric-text">
              Est. Time: {interventionPlan.success_metrics.estimated_time}
            </span>
          </div>
        </div>

        {/* Intervention Steps */}
        <div className="intervention-steps">
          <h3>Guided Resolution Steps</h3>

          {!intervening ? (
            <div className="start-intervention-section">
              <p>Click below to join the call and begin the AI-guided intervention process.</p>
              <button onClick={handleStartIntervention} className="btn-start-intervention">
                🎧 Join Call Now
              </button>
            </div>
          ) : (
            <div className="steps-list">
              {interventionPlan.guided_steps.map((step, index) => {
                const isComplete = completedSteps.includes(step.step);
                const isCurrent = currentStep === index && !isComplete;

                return (
                  <div
                    key={step.step}
                    className={`step-card ${isComplete ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                  >
                    {/* Step Header */}
                    <div className="step-header">
                      <div className="step-number-badge">
                        {isComplete ? '✓' : step.step}
                      </div>
                      <div className="step-title-section">
                        <h4>{step.action}</h4>
                        <span
                          className="step-priority"
                          style={{ color: getPriorityColor(step.priority) }}
                        >
                          {step.priority} PRIORITY
                        </span>
                      </div>
                    </div>

                    {/* Step Content */}
                    {(isCurrent || isComplete) && (
                      <div className="step-content">
                        {/* Script */}
                        <div className="step-script">
                          <div className="script-label">💬 Suggested Script:</div>
                          <div className="script-text">"{step.script}"</div>
                        </div>

                        {/* Key Points */}
                        <div className="step-key-points">
                          <div className="key-points-label">🎯 Key Points:</div>
                          <ul>
                            {step.key_points.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Technical Steps (if any) */}
                        {step.technical_steps && (
                          <div className="step-technical">
                            <div className="technical-label">🔧 Technical Walkthrough:</div>
                            <ol>
                              {step.technical_steps.map((techStep, idx) => (
                                <li key={idx}>{techStep}</li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {/* Expected Outcome */}
                        <div className="step-outcome">
                          <div className="outcome-label">✅ Expected Outcome:</div>
                          <div className="outcome-text">{step.expected_outcome}</div>
                        </div>

                        {/* Complete Button */}
                        {!isComplete && (
                          <button
                            onClick={() => handleCompleteStep(step.step)}
                            className="btn-complete-step"
                          >
                            Mark Step {step.step} Complete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        </div>

        {/* Progress Bar */}
        {intervening && (
          <div className="intervention-progress">
            <div className="progress-label">
              Progress: {completedSteps.length} of {interventionPlan.guided_steps.length} steps complete
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(completedSteps.length / interventionPlan.guided_steps.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          {allStepsComplete && (
            <button onClick={handleFinishIntervention} className="btn-finish-intervention">
              ✅ Finish Intervention
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InterventionModal;
