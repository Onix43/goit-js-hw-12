import { getImageByQuery } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import { clearGallery } from './js/render-functions';
import { showLoader } from './js/render-functions';
import { hideLoader } from './js/render-functions';
import { showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.more');

let search = '';
let totalPages = 1;
let page = 1;
const perPage = 15;

form.addEventListener('submit', async e => {
  e.preventDefault();

  search = form.elements['search-text'].value.trim();

  if (search === '') {
    iziToast.show({
      message: 'Please enter a search query!',
      backgroundColor: `#EF4040`,
      messageColor: `#ffffff`,
      position: `topRight`,
      maxWidth: `432px`,
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImageByQuery(search, page);
    totalPages = Math.ceil(data.totalHits / perPage);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        message:
          ' Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: `#EF4040`,
        messageColor: `#ffffff`,
        position: `topRight`,
        maxWidth: `432px`,
      });
      return;
    }

    createGallery(data.hits);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.error({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (err) {
    hideLoader();
    iziToast.error({ message: `Error: ${err.message}`, position: 'topRight' });
  }
});

loadMoreBtn.addEventListener('click', async e => {
  e.preventDefault();

  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImageByQuery(search, page);
    hideLoader();

    if (!data || data.hits.length === 0) {
      hideLoadMoreButton();
      return;
    }
    createGallery(data.hits);

    const element = document.querySelector('.gallery li');
    if (element) {
      const scrollDistance = element.getBoundingClientRect();
      window.scrollBy({
        top: scrollDistance.height * 2,
        behavior: 'smooth',
      });
    }

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.error({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (err) {
    hideLoader();
    iziToast.error({ message: `Error: ${err.message}`, position: 'topRight' });
  }
});
