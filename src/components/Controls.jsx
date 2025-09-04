import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../state/QuizContext.jsx";

export default function Controls(){
  const nav = useNavigate();
  const { current, total, locked, onLock, next, prev, answers, score, saveHighScore } = useQuiz();

  function onNext(){
    if(current < total - 1){
      next();
    } else {
      // finish
      saveHighScore("You");
      nav("/results");
    }
  }

  const canProceed = locked; // must lock before going next

  return (
    <div className="card" style={{display:'flex', gap:12, justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'}}>
      <div>
        <button id="btn-prev" className="btn" onClick={prev} disabled={current===0}>← Previous</button>
      </div>
      <div style={{display:'flex', gap:10}}>
        {!locked && <button className="btn warn" onClick={onLock}>Lock Answer</button>}
        <button id="btn-next" className={`btn ${current===total-1 ? "success":"primary"}`} onClick={onNext} disabled={!canProceed}>
          {current===total-1 ? "Finish" : "Next →"}
        </button>
      </div>
    </div>
  );
}
