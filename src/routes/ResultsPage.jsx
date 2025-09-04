import React from "react";
import { Link } from "react-router-dom";
import ResultSummary from "../components/ResultSummary.jsx";
import { useQuiz } from "../state/QuizContext.jsx";

export default function ResultsPage(){
  const { score, questions, reset } = useQuiz();
  const total = questions.length;

  return (
    <div className="layout">
      <div className="card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap'}}>
        <h2 style={{margin:0}}>You scored {score}/{total}</h2>
        <div style={{display:'flex', gap:10}}>
          <Link className="btn" to="/">Back Home</Link>
          <Link className="btn primary" to="/quiz" onClick={reset}>Restart Quiz</Link>
        </div>
      </div>
      <ResultSummary />
    </div>
  );
}
