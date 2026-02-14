import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import Navbar from "./components/Navbar";
import ManualPanel from "./components/ManualPanel";
import StatusBanner from "./components/StatusBanner";
import LiveChart from "./components/LiveChart";
import ShapPanel from "./components/ShapPanel";
import ModelComparison from "./components/ModelComparision"


const API = "http://51.21.149.186:8000";

function App() {
  const [health, setHealth] = useState("");
  const [metrics, setMetrics] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [shap, setShap] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    latest_cpu: 50,
    latest_memory: 30,
    prev_cpu_1: 48,
    prev_cpu_2: 47,
    prev_mem_1: 29,
    prev_mem_2: 28
  });

  useEffect(() => {
    axios.get(`${API}/health`)
      .then(res => setHealth(res.data.status))
      .catch(() => setHealth("Down"));
  }, []);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(`${API}/metrics/live`);
        if (!res.data.timestamps) return;

        const data = res.data.timestamps.map((t, i) => ({
          time: t.slice(11, 19),
          CPU: res.data.cpu[i],
          Memory: res.data.memory[i]
        }));

        setMetrics(data);
      } catch {}
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePredict = async () => {
    try {
      setError("");
      const res = await axios.post(`${API}/predict`, form);
      setPrediction(res.data);
      setShap(res.data.SHAP_Explanation_CPU_5 || null);
    } catch {
      setError("Prediction failed");
    }
  };

  const handleAuto = async () => {
    try {
      setError("");
      const res = await axios.post(`${API}/predict/auto`);
      setPrediction(res.data);
      setShap(res.data.SHAP_Explanation_CPU_5 || null);
    } catch {
      setError("Auto prediction failed");
    }
  };

  return (
    <div className="dashboard">

      <Navbar health={health} />

      <div className="main-layout">

        <ManualPanel
          form={form}
          setForm={setForm}
          handlePredict={handlePredict}
          handleAuto={handleAuto}
          prediction={prediction}
          error={error}
        />

        <div className="right-panel">

          {prediction && <StatusBanner prediction={prediction} />}

          <div className="right-lower-grid">

  <div className="upper-row">
    <LiveChart metrics={metrics} />
    {shap && <ShapPanel shap={shap} />}
  </div>

  <ModelComparison />

</div>


        </div>

      </div>
    </div>
  );
}

export default App;
