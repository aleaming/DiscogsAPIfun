import React from 'react';
import Modal from 'react-modal';
import './ReleaseModal.css';

const ReleaseModal = ({ isOpen, onRequestClose, release }) => {
  if (!release) return null;

  const releaseUrl = `https://www.discogs.com/release/${release.id}`;
  const shopUrl = `https://www.discogs.com/sell/list?release_id=${release.id}&format=Vinyl`;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="release-modal"
      overlayClassName="release-modal-overlay"
    >
      <button className="close-button" onClick={onRequestClose}>X</button>
      <div className="modal-header">
        <h2>{release.title}</h2>
      </div>
      <div className="modal-content">
        <img src={release.cover_image} alt={release.title} className="modal-image" />
        <div className="modal-details">
          <table>
            <tbody>
              <tr>
                <th>Format</th>
                <td>{release.format}</td>
              </tr>
              <tr>
                <th>Released</th>
                <td>{release.year}</td>
              </tr>
              <tr>
                <th>Genre</th>
                <td>{release.genre}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{release.country}</td>
              </tr>
              {release.lowest_price && (
                <tr>
                  <th>Lowest Price</th>
                  <td>${release.lowest_price}</td>
                </tr>
              )}
              {release.median_price && (
                <tr>
                  <th>Median Price</th>
                  <td>${release.median_price}</td>
                </tr>
              )}
              {release.highest_price && (
                <tr>
                  <th>Highest Price</th>
                  <td>${release.highest_price}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="tracklist">
            <h3>Tracklist</h3>
            <ul>
              {release.tracklist.map((track, index) => (
                <li key={index}>{track.position} - {track.title}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="modal-actions">
          <a href={releaseUrl} className="outline-button" target="_blank" rel="noopener noreferrer">View this release page</a>
          <a href={shopUrl} className="outline-button" target="_blank" rel="noopener noreferrer">Shop on Marketplace</a>
          <button className="outline-button">Add to my Collection</button>
          <button className="outline-button">Add to Wantlist</button>
          <button className="outline-button">Add to list</button>
          <button className="outline-button">Sell this item</button>
          <button className="outline-button">Database contribution</button>
          <button className="outline-button">Share</button>
        </div>
      </div>
    </Modal>
  );
};

export default ReleaseModal;
