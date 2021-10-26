import refs from '../refs/refs.js';
import ApiService from '../fetch/apiService.js';
import _ from 'lodash';
import image_card from '../../partials/image-card.hbs';
import ColorSwitcher from '../color_switcher.js';
import Gallery from '../gallery.js';

const gallery = new Gallery();
let timerDelayId = null;
const colors = [
  'rgb(16, 17, 19)',
  'rgb(11, 23, 48)',
  'rgb(6, 24, 9)',
  'rgb(32, 6, 24)',
  'rgb(27, 4, 4)',
  'rgb(23, 29, 10)',
];
const colorSwitcher = new ColorSwitcher(colors);
const apiService = new ApiService();
refs.input.addEventListener('input', _.debounce(searchImage, 500));

function getPenPath() {
  console.log('next');
  const nextPenSlugs = [
    '3d9a3b8092ebcf9bc4a72672b81df1ac',
    '2cde50c59ea73c47aec5bd26343ce287',
    'd83110c5f71ea23ba5800b6b1a4a95c4',
  ];

  let slug = nextPenSlugs[this.loadCount];
  if (slug) return `/desandro/debug/${slug}`;
}

function searchImage(e) {
  apiService.query = e.target.value;
  fetchImages();
}

function fetchImages() {
  apiService.fetchName().then(imageFinderMarkUp);
}

function imageMarkUp(e) {
  refs.imageList.insertAdjacentHTML('beforeend', image_card(e));
}

function imageFinderMarkUp(e) {
  if (e.length >= 1) {
    apiService.resetPage();
    gallery.clearUrlList();
    clearArticlesContainer();
    fetchArticles();
    visibilityButton();
    refs.input.classList.remove('inputError');
    // imageMarkUp(e);

    return;
  }
  error();
}

function fetchArticles() {
  apiService.fetchName().then(hits => {
    imageMarkUp(hits);
    gallery.updateURL = hits;
    gallery.initGallery();
  });
}

function clearArticlesContainer() {
  refs.imageList.innerHTML = '';
}

colorSwitcher;

refs.loadMore.addEventListener('click', loadMoreContent);

function loadMoreContent() {
  apiService.incrementPage();
  fetchArticles();
  scrollDown();
}

function scrollDown() {
  timerDelayId = setTimeout(e => {
    delay();
  }, 400);
}

function delay() {
  refs.imageList.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
  clearTimeout(timerDelayId);
}

function visibilityButton() {
  refs.loadMore.classList.remove('is-hidden');
}

function hideButton() {
  refs.loadMore.classList.add('is-hidden');
}
function error() {
  hideButton();
  apiService.resetPage();
  gallery.clearUrlList();
  clearArticlesContainer();
  refs.input.classList.add('inputError');
}
