import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    FaBuilding,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaBriefcase,
    FaHeart,
    FaRegHeart,
} from "react-icons/fa";

import "./JobCard.css";

function JobCard({
    id,
    title,
    company,
    location,
    salary,
    type,
    category,
    logo,
}) {
    const [favorite, setFavorite] = useState(() => {
        const favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];
        return favorites.includes(id);
    });

    useEffect(() => {
        const favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorite) {
            if (!favorites.includes(id)) {
                favorites.push(id);
            }
        } else {
            const index = favorites.indexOf(id);
            if (index > -1) {
                favorites.splice(index, 1);
            }
        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    }, [favorite, id]);

    return (
        <div className="job-card">
            <div className="favorite-icon">
                {favorite ? (
                    <FaHeart onClick={() => setFavorite(false)} />
                ) : (
                    <FaRegHeart onClick={() => setFavorite(true)} />
                )}
            </div>

            <img
                src={logo}
                alt={company}
                className="company-logo"
            />
            <h2>{title}</h2>
            <span className="category-badge">{category}</span>
            <p>
                <FaBuilding /> <strong>Company:</strong> {company}
            </p>

            <p>
                <FaMapMarkerAlt /> <strong>Location:</strong> {location}
            </p>

            <p>
                <FaMoneyBillWave /> <strong>Salary:</strong> {salary}
            </p>

            <p>
                <FaBriefcase /> <strong>Type:</strong> {type}
            </p>

            <Link to={`/jobs/${id}`}>
                <button>Apply Now</button>
            </Link>
        </div>
    );
}

export default JobCard;