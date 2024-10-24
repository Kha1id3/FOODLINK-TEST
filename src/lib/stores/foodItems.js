// src/lib/stores/foodItems.js
import { writable } from 'svelte/store';
import { getFoodItemsByVendor } from '../utils/utilFoodItems';

/**
 * Store to hold food items data
 * @typedef {Object} FoodItemsState
 * @property {Array<any>} users
 */
export const foodItems = writable({ foodItems: [] });

/**
 * Function to fetch food items by vendor
 * @param {string} vendorId - Vendor ID
 */
export const fetchUserFoodItems = async (vendorId) => {
    try {
        const response = await getFoodItemsByVendor(vendorId);
        foodItems.update(() => ({
            foodItems: response.data.food_items,
        }));
    } catch (error) {
        console.error('Error fetching food items:', error);
    }
};
