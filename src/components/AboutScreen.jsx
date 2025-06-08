import Footer from "./Footer";

export default function AboutScreen({ setPage }) {
  return (
    <>
      <div className="screen about-screen">
        <h1>About this app</h1>
        <p>
          This app is a fun way to generate poems based on your keywords. 
          It uses AI to create unique poetry that you can save and revisit.
        </p>
        <p>
          Developed by a passionate coder, this app aims to inspire creativity and 
          provide a platform for poetry lovers.
        </p>
        <button className="big" onClick={() => setPage("start")}>
          Back to start
        </button>
      </div>
      <Footer />
    </>
  );
}