import React from "react";
import { useQuiz } from "../state/QuizContext.jsx";

export default function ResultSummary(){
  const { questions, answers, score } = useQuiz();
  const total = questions.length;
  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Your Results</h2>
      <p>You scored <strong>{score}/{total}</strong></p>
      <div className="grid" role="list">
        {questions.map((q, idx) => {
          const ans = answers[idx];
          const selected = ans?.choiceIndex;
          const correct = q.correctIndex;
          const isCorrect = ans?.correct;
          return (
            <div key={q.id || idx} className="card" role="listitem">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', gap:12}}>
                <div style={{fontWeight:700}}>Q{idx+1}</div>
                <div style={{color:isCorrect?'#22c55e':'#ef4444'}}>{isCorrect ? "✓ Correct" : "✗ Incorrect"}</div>
              </div>
              <div style={{marginTop:8, marginBottom:8}}>{q.question}</div>
              <div style={{display:'grid', gap:8}}>
                <div><small>Your answer:</small> {selected != null ? q.choices[selected] : <em>none</em>}</div>
                <div><small>Correct answer:</small> <strong>{q.choices[correct]}</strong></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
