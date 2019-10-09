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
  console.log(list);
  return list;
}

const fetchSeries = async (offset) => {
  const response = await fetch(`https://gateway.marvel.com/v1/public/series?ts=1&apikey=${marvelapikey}&hash=${marvelapihash}&limit=100${offset ? `&offset=${offset}`: ''}`);
  const { data } = await response.json();
  return data.results;
}

// https://gateway.marvel.com/v1/public/characters?ts=1&apikey=3a6bbe839d07c15e01996061acd6a121&hash=ac4ce3232a11197ececb965dcc3799d1&limit=100