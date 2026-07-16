import Hero from "../components/Hero";
import FeaturedJobs from "../components/FeaturedJobs";
import Categories from "../components/Categories";
import CTA from "../components/CTA";
import HeroStats from "../components/HeroStats";

function Home({ jobs }) {
  return (
    <>
      <Hero />

      <HeroStats />

      <FeaturedJobs jobs={jobs} />
    </>
  );
}

export default Home;