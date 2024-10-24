// src/lib/stores/users.js
import { writable } from 'svelte/store';
import { getAllUsers } from '../utils/utilUsers';

/**
 * Store to hold users data
 * @typedef {Object} UsersState
 * @property {Array<any>} users
 */
export const users = writable({ users: [] });

/**
 * Function to fetch all users
 */
export const fetchAllUsers = async () => {
    try {
        const response = await getAllUsers();
        users.update(() => ({
            users: response.data.users,
        }));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
