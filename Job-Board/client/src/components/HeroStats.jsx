import { useEffect, useState } from "react";

import {
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

import "./HeroStats.css";

function AnimatedNumber({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  return <>{count}+</>;
}

function HeroStats() {
  const stats = [
    {
      icon: <FaBriefcase />,
      number: 250,
      title: "Active Jobs",
    },
    {
      icon: <FaBuilding />,
      number: 80,
      title: "Companies",
    },
    {
      icon: <FaUsers />,
      number: 1200,
      title: "Applicants",
    },
    {
      icon: <FaCheckCircle />,
      number: 500,
      title: "Successful Hires",
    },
  ];

  return (
    <section className="home-stats-section">
      <div className="home-stats-container">
        {stats.map((stat, index) => (
          <div className="home-stat-card" key={index}>
            <div className="home-stat-icon">
              {stat.icon}
            </div>

            <h2>
              <AnimatedNumber end={stat.number} />
            </h2>

            <p>{stat.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeroStats;