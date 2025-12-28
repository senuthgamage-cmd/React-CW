import React from "react";
import data from "./properties.json";
import PropertyCard from "./components/PropertyCard.jsx";
import Header from "./components/Header";


const App = () => {
  return (
  
    <div className="home">
    <Header />

      <h1>Property Listings</h1>

      <div className="property-list">
        {data.properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
