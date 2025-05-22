import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form  = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Будь ласка, введіть пошуковий запит.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);
    hideLoader();

    if (!data.hits.length) {
      iziToast.info({
        message: 'На жаль, зображень за вашим запитом не знайдено.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

  } catch (err) {
    hideLoader();
    iziToast.error({
      message: 'Сталася помилка. Спробуйте пізніше.',
      position: 'topRight',
    });
    console.error(err);
  }
});
