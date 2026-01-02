import React, { useState } from 'react';
import './searchForm.css';

const SearchForm = ({ onSearch }) => {
    const [searchCriteria, setSearchCriteria] = useState({
        type: 'any',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        postcode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchCriteria);
    };

    const handleReset = () => {
        const resetCriteria = {
            type: 'any',
            minPrice: '',
            maxPrice: '',
            minBedrooms: '',
            maxBedrooms: '',
            postcode: ''
        };
        setSearchCriteria(resetCriteria);
        onSearch(resetCriteria);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-row">
                <div className="search-field">
                    <label>Property Type</label>
                    <select name="type" value={searchCriteria.type} onChange={handleChange}>
                        <option value="any">Any</option>
                        <option value="House">House</option>
                        <option value="Flat">Flat</option>
                        <option value="Bungalow">Bungalow</option>
                    </select>
                </div>

                <div className="search-field">
                    <label>Min Price</label>
                    <input
                        type="number"
                        name="minPrice"
                        value={searchCriteria.minPrice}
                        onChange={handleChange}
                        placeholder="Min £"
                    />
                </div>

                <div className="search-field">
                    <label>Max Price</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={searchCriteria.maxPrice}
                        onChange={handleChange}
                        placeholder="Max £"
                    />
                </div>

                <div className="search-field">
                    <label>Min Bedrooms</label>
                    <input
                        type="number"
                        name="minBedrooms"
                        value={searchCriteria.minBedrooms}
                        onChange={handleChange}
                        placeholder="Min"
                        min="0"
                    />
                </div>

                <div className="search-field">
                    <label>Max Bedrooms</label>
                    <input
                        type="number"
                        name="maxBedrooms"
                        value={searchCriteria.maxBedrooms}
                        onChange={handleChange}
                        placeholder="Max"
                        min="0"
                    />
                </div>

                <div className="search-field">
                    <label>Postcode</label>
                    <input
                        type="text"
                        name="postcode"
                        value={searchCriteria.postcode}
                        onChange={handleChange}
                        placeholder="e.g. BR5"
                    />
                </div>
            </div>

            <div className="search-buttons">
                <button type="submit" className="btn-search">Search</button>
                <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
            </div>
        </form>
    );
};

export default SearchForm;