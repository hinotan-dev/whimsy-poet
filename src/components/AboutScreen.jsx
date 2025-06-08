import Footer from "./Footer";

export default function AboutScreen({ setPage }) {
  return (
    <>
      <div className="screen about-screen">
        <h1>About WhimsyPoet</h1>
        <p>
          <strong>WhimsyPoet</strong> is a playful web app that lets kids (<em>and grown-ups!</em>) create whimsical poems from their own imagination.
        </p>
        <p>
          Simply enter a few keywords — like <em class="keyword">pink sky</em> <em class="keyword">upside-down house</em> or <em class="keyword">flying popcorns</em> — and the app will generate a rhythmic, rhyming verse full of childlike wonder.
        </p>
        <button className="big" onClick={() => setPage("start")}>
          Back to start
        </button>
      </div>
      <Footer />
    </>
  );
}