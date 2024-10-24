import { writable } from 'svelte/store';


export const snackbar = writable({ isOpen: false });

export const openSnackbar = () => {
  snackbar.update(current => ({ ...current, isOpen: true }));
};

export const closeSnackbar = () => {
  snackbar.update(current => ({ ...current, isOpen: false }));
};
