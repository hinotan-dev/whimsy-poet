import React from 'react'
import './App.css'
import StartScreen from './components/StartScreen'
import KeywordForm from './components/KeywordForm'
import ThinkingScreen from './components/ThinkingScreen'

import { capitalizeFirstLetter } from './utils.js';


export default function App() {
  
  const [page, setPage] = React.useState("start");
  const [keywords, setKeywords] = React.useState([]);

  function addKeyword(formData) {
    const newKeyword = capitalizeFirstLetter(formData.get("keyword").trim());

    if (!newKeyword) {
      alert('Please enter a valid keyword.');
      return;
    }

    console.log(`Keyword added: ${newKeyword}`);

    setKeywords(prev => [...prev, newKeyword]);
  }

  function submitKeywords(keywords) {
    setPage('thinking');
    // Call AI API to process keywords
    console.log("Submitted keywords:", keywords);
  }

  return (
    <>
      {page === "start" ? (
        <StartScreen
          onStart={() => setPage("keyword-form")}
        />
      ) : page === "keyword-form" ? (
        <KeywordForm
          keywords={keywords}
          addKeyword={addKeyword}
          submitKeywords={submitKeywords}
        />
      ) : page === "thinking" ? (
        <ThinkingScreen
          keywords={keywords}
        />
      ) : null}
    </>
  )
}