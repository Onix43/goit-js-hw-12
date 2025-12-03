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

let paramsSearch = new URLSearchParams({
  page: 1,
  per_page: 15,
});

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

  paramsSearch.set('page', 1);

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImageByQuery(search, paramsSearch);
    totalPages = Math.ceil(
      data.totalHits / Number(paramsSearch.get('per_page'))
    );
    hideLoader();

    if (!data || data.hits.length === 0) {
      iziToast.show({
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
    showLoadMoreButton();
  } catch (err) {
    hideLoader();
    console.log(`Error: ${err.message}`);
  }
});

loadMoreBtn.addEventListener('click', async e => {
  e.preventDefault();

  let current = Number(paramsSearch.get('page'));
  if (current >= totalPages) {
    hideLoadMoreButton();
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
  paramsSearch.set('page', current + 1);

  showLoader();

  try {
    const data = await getImageByQuery(search, paramsSearch);
    hideLoader();

    if (!data || data.hits.length === 0) {
      hideLoadMoreButton();
      return;
    }
    createGallery(data.hits);
    window.scrollBy({
      top: 500,
      behavior: 'smooth',
    });
    showLoadMoreButton();
  } catch (err) {
    hideLoader();
    console.log(`Error: ${err.message}`);
  }
});
