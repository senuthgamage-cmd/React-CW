import React from 'react';
import './PropertyDetail.css';

const PropertyDetail = ({ property, onClose }) => {
    const imageUrl = property.pictures?.[0] || "https://via.placeholder.com/500x300";
    
    return (
        <div className="property-detail-overlay" onClick={onClose}>
            <div className="property-detail" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>
                
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
                        <button className="btn-favourite">❤️ Add to Favourites</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
