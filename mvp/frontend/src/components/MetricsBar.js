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
