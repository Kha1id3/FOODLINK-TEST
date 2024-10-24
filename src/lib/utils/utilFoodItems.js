import axios from 'axios';

/**
 * Get food items by vendor
 * @param {string} name - The name of the vendor
 * @returns {Promise<any>} - Axios response promise
 */
export const getFoodItemsByVendor = (name) => {
    return axios.get(`/api/fooditems/vendor/${name}`);
};
