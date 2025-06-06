import React from 'react';

export default function LibraryScreen({ setPoem, setKeywords, setPage }) {

  const [storedPoems, setStoredPoems] = React.useState([]);

  React.useEffect(() => {
    const stored = localStorage.getItem('poems');
    if (stored) {
      setStoredPoems(JSON.parse(stored));
    }
  }, []);

  function handlePoemClick(poemObj) {
    console.log("Selected poem:", poemObj);
    setPoem(poemObj.poem);
    setKeywords(poemObj.keywords);
    setPage("poem");
  }

  return (
    <div className="library-screen">    
      <h1>Library</h1>
      {storedPoems.length > 0 ? (
        <div className="poems-list">
          {storedPoems.map(poem => (
            <div
              key={poem.id}
              className="poem-item"
              onClick={() => handlePoemClick(poem)}
            >
              <div className={`book-cover ${poem.coverImg}`}>
                <span>{poem.coverChar}</span>
              </div>
              <div className="poem-info">
                <p>{poem.keywords.join(', ')}</p>
                <p>{poem.poem.slice(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No poems found. Start creating some!</p>
      )}
      <button className="back-button" onClick={() => setPage("start")}>
        Back to Start
      </button>
    </div>
  );
}