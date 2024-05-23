import axios from 'axios';

const DISCOGS_BASE_URL = 'https://api.discogs.com';
const CONSUMER_KEY = process.env.REACT_APP_DISCOGS_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.REACT_APP_DISCOGS_CONSUMER_SECRET;

const discogsApi = axios.create({
  baseURL: DISCOGS_BASE_URL,
  params: {
    key: CONSUMER_KEY,
    secret: CONSUMER_SECRET,
  },
});

export const searchArtist = async (artistName) => {
  try {
    const response = await discogsApi.get('/database/search', {
      params: {
        q: artistName,
        type: 'release',
      },
    });

    const resultsWithDetails = await Promise.all(
      response.data.results.map(async (release) => {
        const releaseDetails = await discogsApi.get(`/releases/${release.id}`);
        return {
          ...release,
          artist: releaseDetails.data.artists_sort,
          year: releaseDetails.data.year,
          format: releaseDetails.data.formats.map(f => f.name).join(', '),
          label: releaseDetails.data.labels.map(l => l.name).join(', '),
          lowest_price: releaseDetails.data.lowest_price || null,
          median_price: releaseDetails.data.stats ? releaseDetails.data.stats.median : null,
          highest_price: releaseDetails.data.stats ? releaseDetails.data.stats.max : null,
          tracklist: releaseDetails.data.tracklist || [],
          marketplace_url: releaseDetails.data.uri || null,
          num_for_sale: releaseDetails.data.num_for_sale || null,
          last_sold: releaseDetails.data.last_sold || null,
          lowest_sold: releaseDetails.data.stats ? releaseDetails.data.stats.lowest_price : null,
          highest_sold: releaseDetails.data.stats ? releaseDetails.data.stats.highest_price : null,
          median_sold: releaseDetails.data.stats ? releaseDetails.data.stats.median : null,
          rating: releaseDetails.data.community ? releaseDetails.data.community.rating : null,
          num_ratings: releaseDetails.data.community ? releaseDetails.data.community.rating_count : null,
        };
      })
    );

    return { results: resultsWithDetails };
  } catch (error) {
    console.error('Error searching artist:', error);
    throw error;
  }
};
