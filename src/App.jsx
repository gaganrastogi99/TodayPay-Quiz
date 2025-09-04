import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ProgressBar from "./components/ProgressBar.jsx";
import { useQuiz } from "./state/QuizContext.jsx";

export default function App(){
  const { progress } = useQuiz();
  const loc = useLocation();
  return (
    <div className="container layout">
      <header className="header">
        <div className="brand">
          <div className="logo"><span>Q</span></div>
          <div>TodayPay Quiz</div>
        </div>
        <nav>
          <Link className="btn ghost" to="/">Home</Link>
          <Link className="btn ghost" to="/settings">Settings</Link>
          <Link className="btn primary" to="/quiz">Start Quiz</Link>
        </nav>
      </header>

      {loc.pathname.startsWith("/quiz") && (
        <ProgressBar value={Math.round(progress*100)} />
      )}

      <Outlet />

      <footer className="footer">
        Built with React & Hooks • Keyboard: <span className="kbd">←</span>/<span className="kbd">→</span> to navigate, <span className="kbd">Space</span> to select.
      </footer>
    </div>
  );
}
