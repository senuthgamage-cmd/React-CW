import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../properties.json';
import './PropertyDetailPage.css';

const PropertyDetailPage = ({ onToggleFavorite, isFavorite }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const property = data.properties.find(p => p.id === id);

    if (!property) {
        return (
            <div className="detail-page-container">
                <button className="btn-back" onClick={() => navigate('/')}>← Back to Listings</button>
                <p className="not-found">Property not found</p>
            </div>
        );
    }

    const imageUrl = property.pictures?.[0] || "https://via.placeholder.com/500x300";
    const isPropertyFavorite = isFavorite(property.id);

    const handleFavoriteClick = () => {
        onToggleFavorite(property);
    };

    return (
        <div className="detail-page-container">
            <button className="btn-back" onClick={() => navigate('/')}>← Back to Listings</button>

            <div className="property-detail-page">
                <div className="detail-image">
                    <img src={imageUrl} alt={property.type} />
                </div>

                <div className="detail-content">
                    <h1>{property.type}</h1>
                    
                    <div className="detail-header-info">
                        <p className="price"><strong>£{property.price.toLocaleString()}</strong></p>
                        <p className="location">{property.location}</p>
                        <p className="postcode">Postcode: {property.postcode}</p>
                    </div>

                    <div className="detail-specs">
                        <div className="spec-item">
                            <span className="spec-label">Bedrooms</span>
                            <span className="spec-value">{property.bedrooms}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Tenure</span>
                            <span className="spec-value">{property.tenure}</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-label">Added</span>
                            <span className="spec-value">{new Date(property.added).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="detail-description">
                        <h3>Description</h3>
                        <p>{property.description}</p>
                    </div>

                    <div className="detail-gallery">
                        <h3>Gallery</h3>
                        <div className="gallery-images">
                            {property.pictures && property.pictures.map((pic, idx) => (
                                <img key={idx} src={pic} alt={`View ${idx + 1}`} className="gallery-thumb" />
                            ))}
                        </div>
                    </div>

                    <div className="detail-actions">
                        <button className="btn-enquire">Enquire Now</button>
                        <button 
                            className={`btn-favourite ${isPropertyFavorite ? 'is-favorite' : ''}`}
                            onClick={handleFavoriteClick}
                        >
                            {isPropertyFavorite ? '❤️ Remove from Favourites' : '🤍 Add to Favourites'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailPage;
