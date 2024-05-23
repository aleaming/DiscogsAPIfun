import React, { useState } from 'react';
import './SearchResults.css';
import { truncate } from '../utils/truncate';
import ReleaseModal from './ReleaseModal';

const SearchResults = ({ results }) => {
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (release) => {
    setSelectedRelease(release);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRelease(null);
    setIsModalOpen(false);
  };

  return (
    <div className="search-results">
      {results.map((result) => (
        <div key={result.id} className="search-result-card">
          <div className="search-result-image" style={{ backgroundImage: `url(${result.cover_image})` }} />
          <div className="search-result-info">
            <h3 className="title">{truncate(result.title, 50)}</h3>
            <p className="date">Release Date: {result.year}</p>
            <p className="format">Format: {result.format}</p>
            <p className="label">Label: {result.label}</p>
            <button className="cta-button" onClick={() => openModal(result)}>More Info</button>
          </div>
          {result.lowest_price && (
            <div className="price-container">
              <p className="price">Starting at: ${result.lowest_price}</p>
            </div>
          )}
        </div>
      ))}
      <ReleaseModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        release={selectedRelease}
      />
    </div>
  );
};

export default SearchResults;
