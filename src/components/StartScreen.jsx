import { motion } from "motion/react";
import heroImgBook from '../assets/hero-book.png';
import heroImgDance from '../assets/hero-dance.png';
import heroImgHat from '../assets/hero-hat.png';
import heroImgMagic from '../assets/hero-magic.png';

export default function StartScreen({ setPage }) {
  return (
    <>
      <div className="start-screen">
        <div className="hero-image-wrapper slideshow-container">
          <div className="slideshow">
            <img src={heroImgBook} alt="a book" />
            <img src={heroImgDance} alt="a creature dancing" />
            <img src={heroImgHat} alt="a hat" />
            <img src={heroImgMagic} alt="a magic wand" />
          </div>
        </div>
        <div className="animation-wrapper slide-up">
          <button
            className="big slide-up"
            onClick={() => setPage("keyword-form")}
          >
            Make a poem, please!
          </button>
        </div>
      </div>
      <footer>
        <p>
          Made with ❤️ by hinotan
        </p>
      </footer>
    </>
  );
}