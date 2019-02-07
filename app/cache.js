// @flow
const Cache = {};

Cache.StoreKeys = {
  GLOBAL: 'GLOBAL',
  DESTINATIONS: 'DESTINATIONS',
  DESTINATION: 'DESTINATION',
  THEMES: 'THEMES',
  ARTICLES: 'ARTICLES',
  GALLERY: 'GALLERY',
};

Cache.setItem = (key: string, data: any) => {
  if (typeof Storage !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

// eslint-disable-next-line
Cache.getItem = (key: string) => Cache.exists(key) ? JSON.parse(sessionStorage.getItem(key)) : null;

Cache.exists = (key: string) => typeof window !== 'undefined'
  && typeof Storage !== 'undefined'
  && sessionStorage.getItem(key) !== null;

module.exports = Cache;
