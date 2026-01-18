import React from 'react';
import { Link } from 'react-router-dom';
import './FavoritesSidebar.css';

const FavoritesSidebar = ({ favorites, onRemoveFavorite, onDragOver, onDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div 
      className="favorites-sidebar"
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      <div className="favorites-header">
        <h2>❤️ Favourites</h2>
        <span className="favorites-count">{favorites.length}</span>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <p>No favourites yet!</p>
          <p className="hint">Drag properties here or click the ❤️ button</p>
        </div>
      ) : (
        <div className="favorites-list">
          {favorites.map((property) => (
            <div key={property.id} className="favorite-item">
              <Link to={`/property/${property.id}`} className="favorite-link">
                <img 
                  src={property.pictures?.[0] || property.image || "https://via.placeholder.com/100x75"} 
                  alt={property.type} 
                  className="favorite-thumb"
                />
                <div className="favorite-info">
                  <h4>{property.type}</h4>
                  <p className="favorite-price">£{property.price.toLocaleString()}</p>
                  <p className="favorite-location">{property.bedrooms} bed • {property.postcode}</p>
                </div>
              </Link>
              <button 
                className="btn-remove-favorite"
                onClick={(e) => {
                  e.preventDefault();
                  onRemoveFavorite(property.id);
                }}
                title="Remove from favourites"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesSidebar;
