import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

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

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;
    hideLoader();

    if (!data.hits.length) {
      iziToast.info({
        message: 'На жаль, зображень за вашим запитом не знайдено.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    if (totalHits > currentPage * 15) {
      showLoadMoreButton();
    }
  } catch (err) {
    hideLoader();
    iziToast.error({
      message: 'Сталася помилка. Спробуйте пізніше.',
      position: 'topRight',
    });
    console.error(err);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    hideLoader();

     const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 4,
      behavior: 'smooth',
    });

    if (currentPage * 15 >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (err) {
    hideLoader();
    iziToast.error({
      message: 'Сталася помилка при завантаженні наступної сторінки.',
      position: 'topRight',
    });
    console.error(err);
  }
});
