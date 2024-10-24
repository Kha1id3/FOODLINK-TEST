// src/lib/utils/utilUsers.js
import axios from 'axios';

/**
 * Get all users
 * @returns {Promise<any>} - Axios response promise
 */
export const getAllUsers = () => {
    return axios.get('/api/users/');
};

/**
 * Post client form changes
 * @param {string} id - The user ID
 * @returns {Promise<any>} - Axios response promise
 */
export const postClientFormChanges = (id) => {
    return axios.patch(`/api/users/${id}`);
};
