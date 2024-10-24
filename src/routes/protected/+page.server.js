import { redirect } from '@sveltejs/kit';
import Auth from '$lib/utils/Auth';

/**
 * Load function for protected route
 * @typedef {import('@sveltejs/kit').Load} Load
 */

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ params, fetch }) => {
    if (!Auth.isUserAuthenticated()) {
        throw redirect(307, '/user/login');
    }

    return {};
};
