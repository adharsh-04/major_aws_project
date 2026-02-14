import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function LiveChart({ metrics }) {
  return (
    <div className="card">
      <h3>Live CPU vs Memory</h3>
      {metrics.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis domain={[0, 100]} stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="CPU" stroke="#10b981" strokeWidth={3} />
            <Line type="monotone" dataKey="Memory" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default LiveChart;
