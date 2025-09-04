import React, { useEffect } from "react";
import QuestionCard from "../components/QuestionCard.jsx";
import Controls from "../components/Controls.jsx";
import { useQuiz } from "../state/QuizContext.jsx";

export default function QuizPage(){
  const { questions, loadQuestions, loading, error } = useQuiz();
  useEffect(() => { if(!questions.length) loadQuestions(); }, []);

  if(loading) return <div className="card">Loading questions…</div>;
  if(error) return <div className="card">Error: {error}</div>;
  if(!questions.length) return <div className="card">No questions available.</div>;

  return (
    <div className="layout">
      <QuestionCard />
      <Controls />
    </div>
  );
}
