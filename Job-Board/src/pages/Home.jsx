import Hero from "../components/Hero";
import FeaturedJobs from "../components/FeaturedJobs";

function Home({ jobs }) {
  return (
    <>
      <Hero />
      <FeaturedJobs jobs={jobs} />
    </>
  );
}

export default Home;