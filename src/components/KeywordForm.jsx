import React from 'react';
import { motion } from "motion/react";

import imgTalking from '../assets/talking.png';
import imgTalking2 from '../assets/talking-2.png';

export default function KeywordForm({ keywords, addKeyword, setKeywords, submitKeywords, status }) {

  const [inputValue, setInputValue] = React.useState("");

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeywordSubmit(formData) {
    addKeyword(formData);
    setInputValue(""); // Clear the input after adding
  }

  return (
    <div className="keyword-form-screen">
      {status === "new" ? (
        <h1>
          First things first.<br />
          Tell me some keywords!
        </h1>
      ) : status === "repopulated" ? (
        <h1>
          There you go!<br />
          Tweak the keywords and try again.
        </h1>
      ) : null}
      
      <form action={handleKeywordSubmit} className="add-keyword-form">
        <input
          type="text"
          name="keyword"
          className="big-input"
          placeholder={keywords.length > 0 ? "Add one more..." : "Type a word..."}
          onChange={handleInputChange}
          value={inputValue}
        />
        {inputValue.length >= 2 && (
          <button className="button-add round" type="submit">
            <span>+</span>
          </button>
        )}
      </form>
      
      {keywords.length > 0 ? (
        <>
          <div className="keywords-list">
            {keywords.map((keyword, index) => (
              <span key={index} className="keyword">
                {keyword}
                <a
                  className="remove-keyword"
                  onClick={() => setKeywords(keywords.filter((_, i) => i !== index))}
                >&times;</a>
              </span>
            ))}
          </div>
          <p>Once done, hit the “Make” button and enjoy your poem!</p>
        </>
      ) : (
        <p>
          It can be anything! <br />
          Something you like, or something out of this world.
        </p>
      )}
      
      {keywords.length === 0 ? (
        <div className="talking-creature-wrapper">
          <img className="talking-creature" src={imgTalking} alt="a creature talking" />
        </div>
      ) : (
        <>
          <div className="talking-creature-wrapper eyes-open">
            <img className="talking-creature" src={imgTalking2} alt="a creature talking with eyes open" />
          </div>
          <button className="button-make-poem round" onClick={() => submitKeywords(keywords)}>Make a poem now</button>
        </>
      )}
    </div>
  );
}