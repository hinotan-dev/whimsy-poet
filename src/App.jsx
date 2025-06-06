import React from 'react'
import './App.css'
import StartScreen from './components/StartScreen'
import KeywordForm from './components/KeywordForm'
import ThinkingScreen from './components/ThinkingScreen'
import DisplayPoem from './components/DisplayPoem'
import LibraryScreen from './components/LibraryScreen'

import { capitalizeFirstLetter } from './utils.js';


export default function App() {
  
  const [page, setPage] = React.useState("library");
  // const [keywords, setKeywords] = React.useState([]);
  const [keywords, setKeywords] = React.useState(["Red river", "Upside-down house", "Rainbow but only yellow color"]); // For testing purposes
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

      console.log("Generated poem:", poemMarkdown);
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
          setPage={setPage}
          onStart={() => setPage("keyword-form")}
        />
      ) : page === "keyword-form" ? (
        <KeywordForm
          keywords={keywords}
          addKeyword={addKeyword}
          setKeywords={setKeywords}
          submitKeywords={submitKeywords}
        />
      ) : page === "thinking" ? (
        <ThinkingScreen
          keywords={keywords}
        />
      ) : page === "poem" ? (
        <DisplayPoem
          poem={poem}
          keywords={keywords}
          setPage={setPage}
        />
      ) : page === "library" ? (
        <LibraryScreen
          setPoem={setPoem}
          setKeywords={setKeywords}
          setPage={setPage}
        />
      ) : null}
    </>
  )
}