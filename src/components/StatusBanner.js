import React from "react";

const safeNumber = (value) =>
  value || value === 0 ? Number(value).toFixed(2) : "N/A";

function StatusBanner({ prediction }) {
  return (
    <div className="status-banner-full">
      <div>
        <p>System Status</p>
        <h1>
          {prediction.SLA_Risk === "High"
            ? "SLA Risk Detected"
            : "System Stable"}
        </h1>
      </div>

      <div className="confidence">
        CPU 5m
        <h2>{safeNumber(prediction.Pred_CPU_5)}%</h2>
      </div>
    </div>
  );
}

export default StatusBanner;
