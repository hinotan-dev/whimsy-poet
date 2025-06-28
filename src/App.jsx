import React from 'react'
import './App.css'
import StartScreen from './components/StartScreen'
import KeywordScreen from './components/KeywordScreen.jsx'
import ThinkingScreen from './components/ThinkingScreen'
import PoemScreen from './components/PoemScreen.jsx'
import LibraryScreen from './components/LibraryScreen'
import AboutScreen from './components/AboutScreen'
import Menu from './components/Menu.jsx'

import { capitalizeFirstLetter, getFirstChar, getRandomItem } from './utils.js';


export default function App() {
  
  const [page, setPage] = React.useState("start");
  const [keywords, setKeywords] = React.useState([]);
  // For example:
  // const [keywords, setKeywords] = React.useState(["Red river", "Upside-down house", "Rainbow but only yellow color"]); // For testing purposes
  const [poem, setPoem] = React.useState({
    poemMarkdown: "",
    coverChar: "",
    coverImg: "",
    id: ""
  });

  function addKeyword(formData) {
    const rawKeyword = formData.get("keyword");
    if (!rawKeyword) {
      alert("Please enter a keyword.");
      return false;
    }

    const newKeyword = capitalizeFirstLetter(rawKeyword.trim());
    if (!newKeyword) {
      alert("Please enter a valid keyword.");
      return false;
    }

    console.log(`Keyword added: ${newKeyword}`);
    setKeywords(prev => [...prev, newKeyword]);
    return true;
  }

  async function submitKeywords(keywords) {
    setPage('thinking');
    console.log("Submitted keywords:", keywords);

    // Call AI API to process keywords
    try {
      const poemMarkdown = await generatePoem(keywords);
      console.log("Generated poem:", poemMarkdown);

      const coverChar = getFirstChar(poemMarkdown);
      const coverImg = getRandomItem(['yellow', 'blue', 'red', 'green', 'yellow2', 'blue2', 'red2', 'green2']);

      setPage("poem");
      setPoem({
        poemMarkdown: poemMarkdown,
        coverChar: coverChar,
        coverImg: coverImg,
        id: `poem_${Date.now()}`
      });
    } catch (err) {
      console.error(err);

      // [TODO] Handle error gracefully, e.g. allow user to go back to keywords screen
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
          onStart={() => setPage("keywords")}
        />
      ) : page === "keywords" ? (
        <>
          <Menu setPage={setPage} />
          <KeywordScreen
            keywords={keywords}
            addKeyword={addKeyword}
            setKeywords={setKeywords}
            submitKeywords={submitKeywords}
            status="new"
          />
        </>
      ) : page === "keywords-repopulated" ? (
        <>
          <Menu setPage={setPage} />
          <KeywordScreen
            keywords={keywords}
            addKeyword={addKeyword}
            setKeywords={setKeywords}
            submitKeywords={submitKeywords}
            status="repopulated"
          />
        </>
      ) : page === "thinking" ? (
        <>
          <Menu setPage={setPage} />
          <ThinkingScreen
            keywords={keywords}
          />
        </>
      ) : page === "poem" ? (
        <>
          <Menu setPage={setPage} />
          <PoemScreen
            poem={poem}
            keywords={keywords}
            setPage={setPage}
            status="new"
          />
        </>
      ) : page === "poem-from-library" ? (
        <>
          <Menu setPage={setPage} />
          <PoemScreen
            poem={poem}
            keywords={keywords}
            setPage={setPage}
            status="from-library"
          />
        </>
      ) : page === "library" ? (
        <>
          <Menu setPage={setPage} />
          <LibraryScreen
            setPoem={setPoem}
            setKeywords={setKeywords}
            setPage={setPage}
          />
        </>
      ) : page === "about" ? (
        <>
          <Menu setPage={setPage} />
          <AboutScreen
            setPage={setPage}
          />
        </>
      ) : null}
    </>
  )
}