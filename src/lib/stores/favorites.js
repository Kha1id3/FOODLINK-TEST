// src/lib/stores/favorites.js
import axios from 'axios';
import { writable } from 'svelte/store';

/**
 * Store to hold favorite operations
 * @typedef {Object} FavoritesState
 * @property {boolean} favoriteSaved - Indicates if the favorite was successfully saved
 */
export const favorites = writable({ favoriteSaved: false });

/**
 * Function to set a favorite
 * @param {string} clientId - The client ID
 * @param {string} vendorId - The vendor ID
 * @returns {Promise<void>}
 */
export const setFavorite = async (clientId, vendorId) => {
    if (!clientId || !vendorId) {
        return Promise.reject(new Error('Invalid client or vendor ID')); // Input validation
    }

    try {
        await axios.post('/api/favorites/', { client_id: clientId, vendor_id: vendorId });
        favorites.update(() => ({ favoriteSaved: true }));
    } catch (error) {
        console.error('Error setting favorite:', error);
        favorites.update(() => ({ favoriteSaved: false }));
    }
};
