import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find Your Dream Job Today</h1>

        <p>
          Discover thousands of job opportunities from top companies across
          India and around the world.
        </p>

        <div className="hero-buttons">
          <button className="search-btn">Search Jobs</button>
          <button className="company-btn">Explore Companies</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;