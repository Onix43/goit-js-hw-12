import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.more');

let lightGallery = null;

export function createGallery(images) {
  let result = images
    .map(
      img =>
        `
    <li>
    <div class="li-el">
     <a href="${img.largeImageURL}" class="link"><img src="${img.webformatURL}" alt="${img.tags}"/></a>
      <div class="img-desc">
       <div class="label">
        <span class="name">Likes</span>
        <span class="value">${img.likes}</span>
       </div>
       <div class="label">
        <span class="name">Views</span>
        <span class="value">${img.views}</span>
       </div>
       <div class="label">
        <span class="name">Comments</span>
        <span class="value">${img.comments}</span>
       </div>
       <div class="label">
        <span class="name">Downloads </span>
        <span class="value">${img.downloads}</span>
       </div>
      </div>
      </div>
    </li>
    `
    )
    .join('');
  gallery.innerHTML += result;
  if (lightGallery) {
    lightGallery.refresh();
  } else {
    lightGallery = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'inline-block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function showLoadMoreButton() {
  loadBtn.style.display = 'block';
}
export function hideLoadMoreButton() {
  loadBtn.style.display = 'none';
}
