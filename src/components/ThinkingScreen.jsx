import React from 'react';
import heroImgMagic from '../assets/hero-magic.png';
import '../ScrollingKeywords.css';

export default function ThinkingScreen({ keywords}) {

  const listRef = React.useRef(null);
  const [scrollHeight, setScrollHeight] = React.useState(0);

  const SPEED_FACTOR = 10; // lower = faster

  React.useEffect(() => {
    if (listRef.current) {
      setScrollHeight(listRef.current.scrollHeight);
    }
  }, [keywords]);


  return (
    <div className="screen thinking-screen">
      <h1>Thinking hard...</h1>
      <img className="hero" src={heroImgMagic} alt="a magic wand" />
      <div className="keywords-list scrolling-container">
        <div
          className="scrolling-track"
          style={{
            animation: `scroll-up ${scrollHeight / SPEED_FACTOR}s linear infinite`,
          }}
        >
          <div ref={listRef}>
            {keywords.map((word, i) => (
              <div className="keyword" key={`k1-${i}`}>
                {word}
              </div>
            ))}
          </div>
          <div>
            {keywords.map((word, i) => (
              <div className="keyword" key={`k2-${i}`}>
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
