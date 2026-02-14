import React from "react";

function Navbar({ health }) {
  return (
    <div className="navbar">
      <div className="brand">☁ CloudOptimAI</div>
      <div className="engine">
        XAI Engine:
        <span className={health === "ok" ? "ok" : "down"}>
          {health === "ok" ? " OPERATIONAL" : " DOWN"}
        </span>
      </div>
    </div>
  );
}

export default Navbar;
