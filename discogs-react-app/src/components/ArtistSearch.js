import React, { useState } from 'react';
import { searchArtist } from '../api/discogs';
import SearchResults from './SearchResults';
import './ArtistSearch.css';

const ArtistSearch = () => {
  const [artistName, setArtistName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchArtist(artistName);
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching artist data:', error);
    }
  };

  return (
    <div className="App">
      <div className="hero">
        <div className="hero-content">
          <h1>Search the Vinyl</h1>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Enter artist name"
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </div>
      {results.length > 0 && <SearchResults results={results} />}
    </div>
  );
};

export default ArtistSearch;

