import React from "react";

const safeNumber = (value, decimals = 2) =>
  value || value === 0 ? Number(value).toFixed(decimals) : "N/A";

function ManualPanel({
  form,
  setForm,
  handlePredict,
  handleAuto,
  prediction,
  error
}) {
  return (
    <div className="left-panel">
      <h2>Manual Prediction</h2>

      <div className="form-grid">
        {Object.keys(form).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="number"
              value={form[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: Number(e.target.value) })
              }
            />
          </div>
        ))}
      </div>

      <button className="primary-btn" onClick={handlePredict}>
        Predict
      </button>

      <button className="secondary-btn" onClick={handleAuto}>
        Auto Predict
      </button>

      {error && <p className="error">{error}</p>}

      {prediction && (
        <>
          <h3 className="section-title">CPU Forecast Horizons</h3>

          <div className="horizon-grid">
            <div className="horizon-card">
              <p>5 Minutes</p>
              <h2>{safeNumber(prediction.Pred_CPU_5)}%</h2>
            </div>
            <div className="horizon-card">
              <p>10 Minutes</p>
              <h2>{safeNumber(prediction.Pred_CPU_10)}%</h2>
            </div>
            <div className="horizon-card">
              <p>30 Minutes</p>
              <h2>{safeNumber(prediction.Pred_CPU_30)}%</h2>
            </div>
            <div className="horizon-card">
              <p>60 Minutes</p>
              <h2>{safeNumber(prediction.Pred_CPU_60)}%</h2>
            </div>
          </div>

          <div className="summary-box">
            <div className="summary-card cost-card">
              <p>Predicted Cost</p>
              <h2>₹ {safeNumber(prediction.Predicted_Cost)}</h2>
            </div>

            <div
              className={`summary-card ${
                prediction.SLA_Risk === "High"
                  ? "risk-high"
                  : "risk-low"
              }`}
            >
              <p>SLA Risk</p>
              <h2>{prediction.SLA_Risk}</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ManualPanel;
