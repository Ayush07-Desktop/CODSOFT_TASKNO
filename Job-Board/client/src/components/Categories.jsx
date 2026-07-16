import {
  FaLaptopCode,
  FaCloud,
  FaPalette,
  FaChartLine,
  FaRobot,
  FaMobileAlt,
} from "react-icons/fa";
import "./Categories.css";

function Categories() {
  const categories = [
    { icon: <FaLaptopCode />, title: "Software Development", jobs: "120 Jobs" },
    { icon: <FaCloud />, title: "Cloud Computing", jobs: "80 Jobs" },
    { icon: <FaPalette />, title: "UI / UX Design", jobs: "45 Jobs" },
    { icon: <FaChartLine />, title: "Data Science", jobs: "65 Jobs" },
    { icon: <FaRobot />, title: "AI / ML", jobs: "55 Jobs" },
    { icon: <FaMobileAlt />, title: "Android Development", jobs: "70 Jobs" },
  ];

  return (
    <section className="categories">
      <h2>Browse by Category</h2>

      <div className="category-grid">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <div className="category-icon">{category.icon}</div>

            <h3>{category.title}</h3>

            <p>{category.jobs}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;