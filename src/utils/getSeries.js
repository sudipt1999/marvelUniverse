import {
  marvelapikey,
  marvelapihash
} from '../config';

export default async () => {
  let list = []
  // for (let i = 0; i <= 1100; i += 100) {
  for (let i = 0; i <= 0; i += 100) {
    const seriesList = await fetchSeries(i);
    list = [list, ...seriesList];
  }
  return list;
}

const fetchSeries = async (offset) => {
  const response = await fetch(`https://gateway.marvel.com/v1/public/series?ts=1&apikey=${marvelapikey}&hash=${marvelapihash}&limit=100${offset ? `&offset=${offset}`: ''}`);
  const { data } = await response.json();
  return data.results;
}