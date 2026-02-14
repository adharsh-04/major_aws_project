import React from "react";

const safeNumber = (value) =>
  value || value === 0 ? Number(value).toFixed(4) : "N/A";

function ShapPanel({ shap }) {
  return (
    <div className="card">
      <h3>Feature Contribution (SHAP)</h3>

      {Object.entries(shap).map(([k, v]) => (
        <div key={k} className="shap-row">
          <span className="feature">{k}</span>
          <div className="bar-bg">
            <div
              className={v > 0 ? "bar-pos" : "bar-neg"}
              style={{ width: `${Math.abs(v) * 60}px` }}
            />
          </div>
          <span>{safeNumber(v)}</span>
        </div>
      ))}
    </div>
  );
}

export default ShapPanel;
