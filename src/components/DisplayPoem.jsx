import ReactMarkdown from "react-markdown";
import remarkBreaks from 'remark-breaks';
import { getFirstChar, getRandomItem } from "../utils";


export default function DisplayPoem({ poem, keywords, setPage }) {

  const coverChar = getFirstChar(poem);
  const coverImg = getRandomItem(['yellow', 'blue', 'red', 'green', 'yellow2', 'blue2', 'red2', 'green2']);

  function handleSavePoem() {
    const savedPoems = JSON.parse(localStorage.getItem('poems') || '[]');
    const newPoem = {
      id: `poem_${Date.now()}`, // or use uuid()
      keywords,
      poem: poem,
      coverChar: coverChar,
      coverImg: coverImg,
    };
    localStorage.setItem('poems', JSON.stringify([...savedPoems, newPoem]));
    console.log(localStorage.getItem('poems'));
  }
  
  return (
    <div className="poem-screen">
      <div className={`book-cover ${coverImg}`}>
        <span>{coverChar}</span>
      </div>
      <div className="right-column">
        <div className="poem-content">
          <ReactMarkdown 
            remarkPlugins={[remarkBreaks]}
          >
            {poem}
          </ReactMarkdown>
        </div>
        <div className="button-wrapper">
          <button
            className="love"
            onClick={handleSavePoem}
          >
            Love it
          </button>
          <button
            className="retry"
            onClick={() => setPage("keyword-form")}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}