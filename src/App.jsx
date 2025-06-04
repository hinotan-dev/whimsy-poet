import React from 'react'
import './App.css'
import StartScreen from './components/StartScreen'
import KeywordForm from './components/KeywordForm'
import ThinkingScreen from './components/ThinkingScreen'


export default function App() {
  
  const [page, setPage] = React.useState("start")

  function submitKeywords(keywords) {
    setPage('thinking');
    console.log("Submitted keywords:", keywords);
  }

  return (
    <>
      {page === "start" ? (
        <StartScreen onStart={() => setPage("keyword-form")} />
      ) : page === "keyword-form" ? (
        <KeywordForm submitKeywords={submitKeywords} />
      ) : page === "thinking" ? (
        <ThinkingScreen keywords={["example", "keywords", "here"]} />
      ) : null}
    </>
  )
}