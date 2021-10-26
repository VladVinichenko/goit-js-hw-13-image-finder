import refs from '../refs/refs.js';
// import FetchService from '../fetch/fetchPixabay.js';
// import _ from 'lodash';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24030637-9a01dbfa9269fe16917a62cc0';
fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=car&page=1&per_page=12&key=${KEY}`);
