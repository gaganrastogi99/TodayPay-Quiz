import React, { useEffect } from "react";
import { useQuiz } from "../state/QuizContext.jsx";

export default function QuestionCard(){
  const { current, total, currentQ, answers, onSelect, onLock, locked, timeLeft } = useQuiz();

  useEffect(() => {
    function onKey(e){
      if(e.key === " "){
        e.preventDefault();
        onLock();
      } else if(e.key === "ArrowRight"){
        e.preventDefault();
        document.getElementById("btn-next")?.click();
      } else if(e.key === "ArrowLeft"){
        e.preventDefault();
        document.getElementById("btn-prev")?.click();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onLock]);

  if(!currentQ) return null;
  const selected = answers[current]?.choiceIndex;

  return (
    <div className="card question" aria-live="polite">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
        <div><strong>Question {current+1}</strong> / {total}</div>
        <div aria-label="Time left">⏱ {timeLeft}s</div>
      </div>

      <h2 style={{margin:'4px 0 6px', fontSize:22}}>{currentQ.question}</h2>

      <div className="options" role="listbox" aria-label="Answer options">
        {currentQ.choices.map((c, idx) => {
          const isCorrect = locked && idx === currentQ.correctIndex;
          const isIncorrect = locked && selected === idx && selected !== currentQ.correctIndex;
          return (
            <label key={idx} className={`option ${isCorrect ? "correct": ""} ${isIncorrect ? "incorrect": ""}`}>
              <input
                type="radio"
                name={`q-${current}`}
                checked={selected === idx}
                onChange={() => onSelect(idx)}
                disabled={locked}
              />
              <span>{c}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
