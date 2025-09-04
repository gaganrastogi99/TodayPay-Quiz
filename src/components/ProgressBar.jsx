import React from "react";

export default function ProgressBar({ value = 0 }){
  return (
    <div className="card">
      <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress__bar" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
