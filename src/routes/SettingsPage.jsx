import React from "react";
import { useQuiz } from "../state/QuizContext.jsx";

export default function SettingsPage(){
  const { settings, setSettings, loadQuestions } = useQuiz();

  function update(k, v){
    setSettings(s => ({ ...s, [k]: v }));
  }

  return (
    <div className="layout">
      <div className="card">
        <h2 style={{marginTop:0}}>Settings</h2>
        <div className="grid">
          <div className="card">
            <label>Source</label><br/>
            <select value={settings.source} onChange={e => update("source", e.target.value)}>
              <option value="local">Local JSON</option>
              <option value="api">Open Trivia DB</option>
            </select>
          </div>
          <div className="card">
            <label>Number of Questions</label><br/>
            <input type="number" min="5" max="10" value={settings.amount} onChange={e => update("amount", Number(e.target.value))} />
          </div>
          <div className="card">
            <label>Difficulty</label><br/>
            <select value={settings.difficulty} onChange={e => update("difficulty", e.target.value)}>
              <option value="mixed">Mixed</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="card">
            <label>Category (Open Trivia)</label><br/>
            <input type="number" value={settings.category} onChange={e => update("category", Number(e.target.value))} />
            <div style={{color:'#94a3b8', fontSize:12}}>Default 9 = General Knowledge</div>
          </div>
          <div className="card">
            <label>Timer per Question (sec)</label><br/>
            <input type="number" min="10" max="120" value={settings.timerSec} onChange={e => update("timerSec", Number(e.target.value))} />
          </div>
        </div>

        <div style={{marginTop:12, display:'flex', gap:10}}>
          <button className="btn primary" onClick={loadQuestions}>Apply & Load Questions</button>
        </div>
      </div>
      <div className="card">
        <h3 style={{marginTop:0}}>Tips</h3>
        <ul>
          <li>Use <strong>Local JSON</strong> for offline mode.</li>
          <li>Switch to <strong>Open Trivia DB</strong> to fetch fresh questions; we normalize the API response.</li>
          <li>Use keyboard: <span className="kbd">Space</span> to lock; <span className="kbd">←</span>/<span className="kbd">→</span> to navigate.</li>
        </ul>
      </div>
    </div>
  );
}
