import React from "react";
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property, onToggleFavorite, isFavorite }) => {
    const imageUrl = property.image || property.pictures?.[0] || "https://via.placeholder.com/300x200";

    const handleDragStart = (e) => {
        e.dataTransfer.setData('propertyId', property.id);
        e.dataTransfer.effectAllowed = 'copy';
    };

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite(property);
    };

    return (
        <div
            className='property-card'
            draggable="true"
            onDragStart={handleDragStart}
            data-testid="property-card"
        >
            <button
                className={`btn-favorite-icon ${isFavorite ? 'is-favorite' : ''}`}
                onClick={handleFavoriteClick}
                title={isFavorite ? "Remove from favourites" : "Add to favourites"}
                aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            <Link to={`/property/${property.id}`} style={{ textDecoration: 'none' }}>
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
            </Link>
        </div>
    );
};

export default PropertyCard;