import React from "react";
import "./ModelComparision.css";

function ModelComparison() {

  // White Box Model metrics
  const whiteBox = {
    r2: 0.8476,
    mse: 75.41,
    rmse: Math.sqrt(75.41).toFixed(2)
  };

  // Black Box Model metrics
  const blackBox = {
    cpu_rmse: 19.50,
    cpu_mae: 13.83,
    mem_rmse: 9.63,
    mem_mae: 6.90
  };

  return (
    <div className="comparison-container">

      <h3>Model Behaviour & Scalability Comparison</h3>

      <div className="comparison-grid">

        {/* White Box */}
        <div className="model-card white-box">
          <h4>White Box Model (Baseline)</h4>

          <p><strong>R² Score:</strong> {whiteBox.r2}</p>
          <p><strong>RMSE:</strong> {whiteBox.rmse}</p>

          <div className="badge blue">High Interpretability</div>
          <div className="badge blue">Fast Retraining</div>
          <div className="badge blue">Low Compute Cost</div>
        </div>

        {/* Black Box */}
        <div className="model-card black-box highlight">
          <h4>Black Box Model (Primary Production Model)</h4>

          <p><strong>CPU RMSE:</strong> {blackBox.cpu_rmse}</p>
          <p><strong>Memory RMSE:</strong> {blackBox.mem_rmse}</p>

          <div className="badge green">Learns Temporal Patterns</div>
          <div className="badge green">Handles Non-Linear Workloads</div>
          <div className="badge green">Scalable for Large Time-Series Data</div>
        </div>

      </div>

      <div className="comparison-summary">
        <ul>
          <li><strong>White Box:</strong> Suitable for interpretable baseline validation and structured workload patterns.</li>
          <li><strong>Black Box:</strong> More effective for real-time cloud monitoring, dynamic scaling, and SLA risk prediction in large-scale environments.</li>
        </ul>
      </div>

    </div>
  );
}

export default ModelComparison;
