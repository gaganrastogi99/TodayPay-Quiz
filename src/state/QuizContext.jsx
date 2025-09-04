import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import localData from "../data/questions.json";
import { normalizeFromOpenTrivia, shuffle } from "../utils/utils.js";

const QuizCtx = createContext();

const DEFAULT_SETTINGS = {
  source: "local", // "api" | "local"
  amount: 10,
  difficulty: "mixed", // easy|medium|hard|mixed
  category: 9, // General Knowledge
  timerSec: 30
};

export function QuizProvider({ children }){
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("tpq_settings");
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]); // {choiceIndex, correct:boolean}
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(settings.timerSec);

  const total = questions.length;
  const progress = total ? (current / total) : 0;

  // Load questions on mount or when settings.source changes (fresh start)
  useEffect(() => {
    localStorage.setItem("tpq_settings", JSON.stringify(settings));
  }, [settings]);

  async function loadQuestions(){
    setLoading(true); setError(null);
    try {
      if(settings.source === "api"){
        const url = new URL("https://opentdb.com/api.php");
        url.searchParams.set("amount", String(settings.amount));
        if(settings.difficulty !== "mixed") url.searchParams.set("difficulty", settings.difficulty);
        if(settings.category) url.searchParams.set("category", String(settings.category));
        const res = await fetch(url.toString());
        if(!res.ok) throw new Error("Failed to fetch questions");
        const data = await res.json();
        const normalized = normalizeFromOpenTrivia(data);
        setQuestions(normalized);
      } else {
        setQuestions(shuffle(localData).slice(0, settings.amount));
      }
      setCurrent(0);
      setAnswers([]);
      setLocked(false);
      setTimeLeft(settings.timerSec);
    } catch(e){
      setError(e.message || "Unknown error");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }

  // timer
  useEffect(() => {
    if(!total) return;
    if(locked) return;
    if(timeLeft <= 0){
      // auto lock with no selection
      onLock();
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t-1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, locked, total]);

  const currentQ = questions[current];

  function onSelect(choiceIndex){
    if(locked) return;
    setAnswers(prev => {
      const next = [...prev];
      next[current] = { choiceIndex };
      return next;
    });
  }

  function onLock(){
    if(locked) return;
    const q = currentQ;
    const a = answers[current];
    const correct = a != null && a.choiceIndex === q.correctIndex;
    setAnswers(prev => {
      const next = [...prev];
      next[current] = { ...(next[current] || {}), correct: !!correct };
      return next;
    });
    setLocked(true);
  }

  function next(){
    if(current < total - 1){
      setCurrent(c => c+1);
      setLocked(false);
      setTimeLeft(settings.timerSec);
    }
  }
  function prev(){
    if(current > 0){
      setCurrent(c => c-1);
      setLocked(true); // keep previous locked state
      setTimeLeft(settings.timerSec);
    }
  }

  const score = useMemo(() => answers.reduce((s,a) => s + (a?.correct ? 1 : 0), 0), [answers]);

  function reset(){
    setCurrent(0);
    setAnswers([]);
    setLocked(false);
    setTimeLeft(settings.timerSec);
  }

  function saveHighScore(name="You"){
    const entry = { name, score, total, date: new Date().toISOString() };
    const list = JSON.parse(localStorage.getItem("tpq_highscores") || "[]");
    list.push(entry);
    list.sort((a,b) => b.score - a.score || new Date(b.date) - new Date(a.date));
    const top = list.slice(0, 10);
    localStorage.setItem("tpq_highscores", JSON.stringify(top));
    return top;
  }

  const value = {
    settings, setSettings,
    questions, loadQuestions, loading, error,
    current, currentQ, total,
    answers, locked, onSelect, onLock, next, prev, reset,
    timeLeft,
    score,
    progress,
    saveHighScore
  };

  return <QuizCtx.Provider value={value}>{children}</QuizCtx.Provider>;
}

export function useQuiz(){
  return useContext(QuizCtx);
}
