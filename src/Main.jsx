import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App.jsx";
import QuizPage from "./routes/QuizPage.jsx";
import ResultsPage from "./routes/ResultsPage.jsx";
import HomePage from "./routes/HomePage.jsx";
import SettingsPage from "./routes/SettingsPage.jsx";
import { QuizProvider } from "./state/QuizContext.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QuizProvider>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='quiz' element={<QuizPage />} />
            <Route path='results' element={<ResultsPage />} />
            <Route path='settings' element={<SettingsPage />} />
          </Route>
        </Routes>
      </QuizProvider>
    </BrowserRouter>
  </React.StrictMode>
);
