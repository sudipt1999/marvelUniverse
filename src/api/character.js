import apiConfig from './api-config';

const fetchCharactersPaginated = page => {
  return new Promise((resolve, reject) => {
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${apiConfig.timestamp}&apikey=${apiConfig.marvelapikey}&hash=${apiConfig.marvelapihash}&limit=${apiConfig.perPage}&offset=${(page - 1) * apiConfig.perPage}`)
      .then(res => res.json())
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  })
};

const fetchCharactersByNamePaginated = (name, page) => {
  return new Promise((resolve, reject) => {
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${apiConfig.timestamp}&apikey=${apiConfig.marvelapikey}&hash=${apiConfig.marvelapihash}&nameStartsWith=${name}&limit=${apiConfig.perPage}&offset=${(page - 1) * apiConfig.perPage}`)
      .then(res => res.json())
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  })
};

const fetchCharacterById = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=${apiConfig.timestamp}&apikey=${apiConfig.marvelapikey}&hash=${apiConfig.marvelapihash}`)
      .then(res => res.json())
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  })
};

export {
  fetchCharactersPaginated,
  fetchCharactersByNamePaginated,
  fetchCharacterById
};
