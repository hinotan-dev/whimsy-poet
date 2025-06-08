import React from 'react';

export default function LibraryScreen({ setPoem, setKeywords, setPage }) {

  const [storedPoems, setStoredPoems] = React.useState([]);

  React.useEffect(() => {
    const stored = localStorage.getItem('poems');
    if (stored) {
      setStoredPoems(JSON.parse(stored));
    }
  }, []);

  function handlePoemClick(poem) {
    console.log("Selected poem:", poem);
    setPoem({
      poemMarkdown: poem.poemMarkdown,
      coverChar: poem.coverChar,
      coverImg: poem.coverImg,
      id: poem.id
    });
    setKeywords(poem.keywords);
    setPage("poem-from-library");
  }

  function getPoemTitle(poemMarkdown) {
    const lines = poemMarkdown.replace(/^#/, '').trim().split('\n');
    return lines[0] ? lines[0].trim() : "Untitled Poem";
  }

  return (
    <div className="screen library-screen">    
      <h1>Library</h1>
      {storedPoems.length === 0 && (
        <p>Seems like you haven't saved any poems yet.</p>
      )}
      <div className="poems-list">
        {storedPoems.length > 0 && storedPoems.map(poem => (
          <div
            key={poem.id}
            className="poem-item"
          >
            <div
              className={`book-cover ${poem.coverImg}`}
              onClick={() => handlePoemClick(poem)}
            >
              <span>{poem.coverChar}</span>
            </div>
            <div className="poem-info">
              <p className="title">{getPoemTitle(poem.poemMarkdown)}</p>
            </div>
          </div>
        ))}
        <div className="poem-item">
          <div
            className="book-cover empty"
            onClick={() => setPage("keywords")}
          >
            <span>?</span>
          </div>
          <div className="poem-info">
            <p className="title">Make a new poem!</p>
          </div>
        </div>
      </div>
    </div>
  );
}