import { parse } from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const cookies = parse(event.request.headers.get('cookie') || '');
    const userToken = cookies.token;

    // If the user isn't authenticated, redirect them to the login page
    if (!userToken && event.url.pathname.startsWith('/protected')) {
        return new Response(null, { status: 307, headers: { location: '/user/login' } });
    }

    return resolve(event);
}
