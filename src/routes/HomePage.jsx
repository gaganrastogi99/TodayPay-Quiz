import React from "react";
import { Link } from "react-router-dom";
import HighScores from "../components/HighScores.jsx";

export default function HomePage(){
  return (
    <div className="layout">
      <section className="hero">
        <div className="card">
          <h1 className="title">Drill your knowledge with a sleek, focused quiz.</h1>
          <p className="sub">One question at a time, instant feedback after locking, a clean summary at the end. Timer, progress bar, and persistent high scores included.</p>
          <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
            <Link className="btn primary" to="/quiz">Start Quiz</Link>
            <Link className="btn ghost" to="/settings">Settings</Link>
          </div>
        </div>
        <div className="card">
          <ul style={{lineHeight:1.8, margin:0}}>
            <li>Responsive UI for mobile & desktop</li>
            <li>Keyboard navigation: <span className="kbd">←</span>/<span className="kbd">→</span> and <span className="kbd">Space</span></li>
            <li>Local or Open Trivia DB questions</li>
            <li>Timer per question</li>
            <li>Results with your answers vs correct answers</li>
          </ul>
        </div>
      </section>
      <HighScores />
    </div>
  );
}
