import React from 'react'
import './App.css'
import StartScreen from './components/StartScreen'
import KeywordForm from './components/KeywordForm'
import ThinkingScreen from './components/ThinkingScreen'

import { capitalizeFirstLetter } from './utils.js';


export default function App() {
  
  const [page, setPage] = React.useState("start");
  const [keywords, setKeywords] = React.useState([]);
  const [poem, setPoem] = React.useState("");

  function addKeyword(formData) {
    const newKeyword = capitalizeFirstLetter(formData.get("keyword").trim());

    if (!newKeyword) {
      alert('Please enter a valid keyword.');
      return;
    }

    console.log(`Keyword added: ${newKeyword}`);

    setKeywords(prev => [...prev, newKeyword]);
  }

  async function submitKeywords(keywords) {
    setPage('thinking');
    console.log("Submitted keywords:", keywords);

    // Call AI API to process keywords
    try {
      const poemMarkdown = await generatePoem(keywords);
      setPage("poem")
      setPoem(poemMarkdown);
    } catch (err) {
      console.error(err);
      alert("Sorry, I couldn't generate a poem at this time. Please try again.");
    }
  }

  async function generatePoem(keywords) {
    const res = await fetch('/api/generate-poem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || 'Unknown error occurred');
    }
    const data = await res.json();
    return data.result;
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
      ) : page === "poem" ? (
        <div className="poem-screen">
          <div className="poem-content" dangerouslySetInnerHTML={{ __html: poem }} />
          <button className="button-back" onClick={() => setPage("keyword-form")}>
            Back to Keywords
          </button>
        </div>
      ) : null}
    </>
  )
}