import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './searchForm.css';

const typeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'House', label: 'House' },
    { value: 'Flat', label: 'Flat' },
    { value: 'Bungalow', label: 'Bungalow' },
    { value: 'Maisonette', label: 'Maisonette' }
];

const SearchForm = ({ onSearch, properties = [] }) => {
    const initialCriteria = {
        type: 'any',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        postcode: '',
        dateAddedFrom: '',
        dateAddedTo: ''
    };

    const [searchCriteria, setSearchCriteria] = useState(initialCriteria);
    const [selectedType, setSelectedType] = useState(typeOptions[0]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const updateField = (name, value) => {
        setSearchCriteria((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTypeChange = (option) => {
        setSelectedType(option);
        updateField('type', option ? option.value : 'any');
    };

    const handleDateChange = (name, date) => {
        updateField(name, date ? date.toISOString().split('T')[0] : '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchCriteria);
    };

    const handleReset = () => {
        setSearchCriteria(initialCriteria);
        setSelectedType(typeOptions[0]);
        onSearch(initialCriteria);
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-row">
                <div className="search-field">
                    <label htmlFor="type-select">Property Type</label>
                    <Select
                        inputId="type-select"
                        name="type"
                        options={typeOptions}
                        value={selectedType}
                        onChange={handleTypeChange}
                        classNamePrefix="react-select"
                    />
                </div>

                <div className="search-field">
                    <label htmlFor="minPrice">Min Price</label>
                    <input
                        id="minPrice"
                        type="range"
                        name="minPrice"
                        min="0"
                        max="1500000"
                        step="50000"
                        value={searchCriteria.minPrice || 0}
                        onChange={(e) => handleChange(e)}
                    />
                    <span className="slider-value">£{Number(searchCriteria.minPrice || 0).toLocaleString()}</span>
                </div>

                <div className="search-field">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input
                        id="maxPrice"
                        type="range"
                        name="maxPrice"
                        min="0"
                        max="1500000"
                        step="50000"
                        value={searchCriteria.maxPrice || 1500000}
                        onChange={(e) => handleChange(e)}
                    />
                    <span className="slider-value">£{Number(searchCriteria.maxPrice || 1500000).toLocaleString()}</span>
                </div>

                <div className="search-field">
                    <label htmlFor="minBedrooms">Min Bedrooms</label>
                    <input
                        id="minBedrooms"
                        type="range"
                        name="minBedrooms"
                        value={searchCriteria.minBedrooms || 0}
                        onChange={(e) => handleChange(e)}
                        min="0"
                        max="5"
                        step="1"
                    />
                    <span className="slider-value">{searchCriteria.minBedrooms || 0} bed</span>
                </div>

                <div className="search-field">
                    <label htmlFor="maxBedrooms">Max Bedrooms</label>
                    <input
                        id="maxBedrooms"
                        type="range"
                        name="maxBedrooms"
                        value={searchCriteria.maxBedrooms || 5}
                        onChange={(e) => handleChange(e)}
                        min="0"
                        max="5"
                        step="1"
                    />
                    <span className="slider-value">{searchCriteria.maxBedrooms || 5} bed</span>
                </div>

                <div className="search-field">
                    <label htmlFor="postcode">Postcode</label>
                    <input
                        id="postcode"
                        type="text"
                        name="postcode"
                        value={searchCriteria.postcode}
                        onChange={handleChange}
                        placeholder="e.g. BR5"
                    />
                </div>

                <div className="search-field">
                    <label htmlFor="dateAddedFrom">Date added from</label>
                    <DatePicker
                        id="dateAddedFrom"
                        selected={searchCriteria.dateAddedFrom ? new Date(searchCriteria.dateAddedFrom) : null}
                        onChange={(date) => handleDateChange('dateAddedFrom', date)}
                        dateFormat="yyyy-MM-dd"
                        customInput={<input id="dateAddedFrom" aria-label="Date added from" />}
                        placeholderText="YYYY-MM-DD"
                    />
                </div>

                <div className="search-field">
                    <label htmlFor="dateAddedTo">Date added to</label>
                    <DatePicker
                        id="dateAddedTo"
                        selected={searchCriteria.dateAddedTo ? new Date(searchCriteria.dateAddedTo) : null}
                        onChange={(date) => handleDateChange('dateAddedTo', date)}
                        dateFormat="yyyy-MM-dd"
                        customInput={<input id="dateAddedTo" aria-label="Date added to" />}
                        placeholderText="YYYY-MM-DD"
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