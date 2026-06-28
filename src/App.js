import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import data from "./properties.json";
import PropertyCard from "./components/PropertyCard.jsx";
import PropertyDetailPage from "./pages/PropertyDetailPage.jsx";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import FavoritesSidebar from "./components/FavoritesSidebar";
import "./App.css";

const App = () => {
  const [filteredProperties, setFilteredProperties] = useState(data.properties);
  const [showSearch, setShowSearch] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (property) => {
    if (!favorites.find((fav) => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  const removeFromFavorites = (propertyId) => {
    setFavorites(favorites.filter((fav) => fav.id !== propertyId));
  };

  const toggleFavorite = (property) => {
    if (favorites.find((fav) => fav.id === property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  const isFavorite = (propertyId) => favorites.some((fav) => fav.id === propertyId);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const propertyId = e.dataTransfer.getData('propertyId');
    const property = data.properties.find((p) => p.id === propertyId);
    if (property) {
      addToFavorites(property);
    }
  };

  const handleSearch = (criteria) => {
    let results = data.properties;

    if (criteria.type && criteria.type !== 'any') {
      results = results.filter((prop) => prop.type === criteria.type);
    }

    if (criteria.minPrice) {
      results = results.filter((prop) => prop.price >= Number(criteria.minPrice));
    }
    if (criteria.maxPrice) {
      results = results.filter((prop) => prop.price <= Number(criteria.maxPrice));
    }

    if (criteria.minBedrooms) {
      results = results.filter((prop) => prop.bedrooms >= Number(criteria.minBedrooms));
    }
    if (criteria.maxBedrooms) {
      results = results.filter((prop) => prop.bedrooms <= Number(criteria.maxBedrooms));
    }

    if (criteria.postcode) {
      results = results.filter((prop) => prop.postcode.toLowerCase().includes(criteria.postcode.toLowerCase()));
    }

    if (criteria.dateAddedFrom) {
      const from = new Date(criteria.dateAddedFrom);
      results = results.filter((prop) => new Date(prop.added) >= from);
    }

    if (criteria.dateAddedTo) {
      const to = new Date(criteria.dateAddedTo);
      results = results.filter((prop) => new Date(prop.added) <= to);
    }

    setFilteredProperties(results);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const HomePage = () => (
    <div className="home">
      <Header onSearchClick={toggleSearch} />

      {showSearch && <SearchForm onSearch={handleSearch} properties={data.properties} />}

      <h1>Property Listings ({filteredProperties.length})</h1>

      <div className="property-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite(property.id)}
            />
          ))
        ) : (
          <p className="no-results">No properties found matching your criteria.</p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <FavoritesSidebar
        favorites={favorites}
        onRemoveFavorite={removeFromFavorites}
        onDrop={handleDrop}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/property/:id"
          element={
            <PropertyDetailPage
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
