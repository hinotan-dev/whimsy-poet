import React from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from 'remark-breaks';
import { getFirstChar, getRandomItem } from "../utils";


export default function PoemScreen({ poem, keywords, setPage, status }) {

  const [isSaved, setIsSaved] = React.useState(false);

  function handleSavePoem() {
    const savedPoems = JSON.parse(localStorage.getItem('poems') || '[]');
    // Check if the poem already exists
    const existingPoem = savedPoems.find(p => p.id === poem.id);
    if (existingPoem) {
      console.log("Poem already saved:", existingPoem);
      return;
    }
    const newPoem = {
      keywords,
      poemMarkdown: poem.poemMarkdown,
      coverChar: poem.coverChar,
      coverImg: poem.coverImg,
      id: poem.id,
    };
    localStorage.setItem('poems', JSON.stringify([...savedPoems, newPoem]));
    setIsSaved(true);
    console.log("Poem saved.");
  }

  function handleDeletePoem() {
    // Promopt the user for confirmation
    if (!window.confirm("Are you sure you want to delete this poem?")) {
      return;
    }
    // Delete the poem from localStorage
    const savedPoems = JSON.parse(localStorage.getItem('poems') || '[]');
    
    console.log("poem.id to delete: ", poem.id)
    console.log("saved poems from LS: ", savedPoems)

    const updatedPoems = savedPoems.filter(p => p.id !== poem.id);
    console.log("updated poems: ", updatedPoems)

    localStorage.setItem('poems', JSON.stringify(updatedPoems));
    console.log("Poem deleted.");
    setPage("library");
  }
  
  return (
    <div className="screen poem-screen">
      <div className="poem-wrapper">
        <div className={`book-cover ${poem.coverImg}`}>
          <span>{poem.coverChar}</span>
        </div>
        <div className="right-column">
          <div className="poem-content">
            <ReactMarkdown 
              remarkPlugins={[remarkBreaks]}
            >
              {poem.poemMarkdown}
            </ReactMarkdown>
          </div>
          {status === "new" && !isSaved ? (
            <div className="button-wrapper">
              <button
                className="medium love"
                onClick={handleSavePoem}
              >
                Love it
              </button>
              <button
                className="medium retry"
                onClick={() => setPage("keywords")}
              >
                Try again
              </button>
            </div>
          ) : status === "new" && isSaved ? (
            <div className="button-wrapper">
              <button
                className="medium love saved"
              >
                Saved!
              </button>
              <button
                className="medium books"
                onClick={() => setPage("library")}
              >
                Go to library
              </button>
            </div>
          ) : status === "from-library" ? (
            <>
              <div className="button-wrapper">
                <button
                  className="medium edit"
                  onClick={() => setPage("keywords-repopulated")}
                >
                  See keywords
                </button>
                <button
                  className="medium delete"
                  onClick={handleDeletePoem}
                >
                  Scratch it
                </button>
              </div>
              <div className="button-wrapper">
                <button
                  className="medium books"
                  onClick={() => setPage("library")}
                >
                  Back to library
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}