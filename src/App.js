import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import data from "./properties.json";
import PropertyCard from "./components/PropertyCard.jsx";
import PropertyDetailPage from "./pages/PropertyDetailPage.jsx";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import "./App.css";

const App = () => {
  const [filteredProperties, setFilteredProperties] = useState(data.properties);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (criteria) => {
    let results = data.properties;

    // Filter by type
    if (criteria.type && criteria.type !== 'any') {
      results = results.filter(prop => prop.type === criteria.type);
    }

    // Filter by price range
    if (criteria.minPrice) {
      results = results.filter(prop => prop.price >= Number(criteria.minPrice));
    }
    if (criteria.maxPrice) {
      results = results.filter(prop => prop.price <= Number(criteria.maxPrice));
    }

    // Filter by bedrooms
    if (criteria.minBedrooms) {
      results = results.filter(prop => prop.bedrooms >= Number(criteria.minBedrooms));
    }
    if (criteria.maxBedrooms) {
      results = results.filter(prop => prop.bedrooms <= Number(criteria.maxBedrooms));
    }

    // Filter by postcode
    if (criteria.postcode) {
      results = results.filter(prop => 
        prop.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())
      );
    }

    setFilteredProperties(results);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const HomePage = () => (
    <div className="home">
      <Header onSearchClick={toggleSearch} />
      
      {showSearch && <SearchForm onSearch={handleSearch} />}

      <h1>Property Listings ({filteredProperties.length})</h1>

      <div className="property-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))
        ) : (
          <p className="no-results">No properties found matching your criteria.</p>
        )}
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/property/:id" element={<PropertyDetailPage />} />
    </Routes>
  );
};

export default App;
