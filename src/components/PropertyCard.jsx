import React from "react";

const PropertyCard = ({ property }) => {
    const imageUrl = property.image || property.pictures?.[0] || "https://via.placeholder.com/300x200";
    
    return (
        <div className='property-card'>
            <img src={imageUrl} alt={property.type} />

            <h3>{property.type}</h3>
            <p>{property.description}</p>
            <p><strong>£{property.price}</strong></p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Postcode: {property.postcode}</p>        
        </div>
    );
};

export default PropertyCard;