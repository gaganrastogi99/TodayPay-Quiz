import React, { useEffect, useState } from "react";

export default function HighScores(){
  const [scores, setScores] = useState([]);
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("tpq_highscores") || "[]");
    setScores(list);
  }, []);
  if(!scores.length) return null;
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>High Scores</h3>
      <ol>
        {scores.map((s, i) => (
          <li key={i}>{s.name} — {s.score}/{s.total} <small style={{color:'#94a3b8'}}>({new Date(s.date).toLocaleString()})</small></li>
        ))}
      </ol>
    </div>
  );
}
