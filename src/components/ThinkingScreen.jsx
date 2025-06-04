import heroImgMagic from '../assets/hero-magic.png';

export default function ThinkingScreen({ keywords}) {
  return (
    <div className="thinking-screen">
      <h1>Thinking hard...</h1>
      <img className="hero" src={heroImgMagic} alt="a magic wand" />
      <div className="keywords-list">
        {keywords.map((keyword, index) => (
          <span key={index} className="keyword">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
