import googleLogo from "../assets/logos/google.png";
import amazonLogo from "../assets/logos/amazon.png";
import infosysLogo from "../assets/logos/infosys.png";
import adobeLogo from "../assets/logos/adobe.png";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    salary: "₹12 LPA",
    type: "Full Time",
    category: "Frontend",
    logo: googleLogo,
    description:
      "Develop responsive and user-friendly web applications using React.js, HTML, CSS, and JavaScript.",
  },
  {
    id: 2,
    title: "Cloud Engineer",
    company: "Amazon",
    location: "Hyderabad",
    salary: "₹18 LPA",
    type: "Full Time",
    category: "Cloud",
    logo: amazonLogo,
    description:
      "Design, deploy, and maintain cloud infrastructure using AWS services such as EC2, S3, Lambda, and VPC.",
  },
  {
    id: 3,
    title: "Java Backend Developer",
    company: "Infosys",
    location: "Pune",
    salary: "₹10 LPA",
    type: "Full Time",
    category: "Backend",
    logo: infosysLogo,
    description:
      "Build scalable REST APIs using Java, Spring Boot, and MySQL while following clean coding practices.",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Noida",
    salary: "₹9 LPA",
    type: "Remote",
    category: "Design",
    logo: adobeLogo,
    description:
      "Create modern user interfaces, wireframes, and prototypes using Figma and Adobe XD.",
  },
];

export default jobs;