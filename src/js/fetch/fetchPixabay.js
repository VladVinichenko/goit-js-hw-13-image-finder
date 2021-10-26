const BASE_URL = 'https://pixabay.com/api/';
const KEY = '24030637-9a01dbfa9269fe16917a62cc0';

export default class fetchService {
  constructor() {
    this.searchQuery = '';
  }

  fetchName() {
    const url = `${BASE_URL}/name/${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(e => {
        return e;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
