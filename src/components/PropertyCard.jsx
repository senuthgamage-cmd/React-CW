import React from "react";
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
    const imageUrl = property.image || property.pictures?.[0] || "https://via.placeholder.com/300x200";
    
    return (
        <Link to={`/property/${property.id}`} style={{ textDecoration: 'none' }}>
            <div className='property-card'>
                <img src={imageUrl} alt={property.type} />

                <div className="card-content">
                    <h3>{property.type}</h3>
                    <p className="location">{property.location}</p>
                    <p className="price"><strong>£{property.price.toLocaleString()}</strong></p>
                    <div className="card-meta">
                        <span>🛏️ {property.bedrooms}</span>
                        <span>📍 {property.postcode}</span>
                    </div>
                    <button className="btn-view-details">View Details</button>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;