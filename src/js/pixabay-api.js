import axios from 'axios';

export async function getImageByQuery(query, paramsSearch) {
  return await axios(`https://pixabay.com/api/?${paramsSearch.toString()}`, {
    params: {
      key: '53503669-da6de2716d59628c83ce4fe17',
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  })
    .then(response => {
      return {
        hits: response.data.hits,
        totalHits: response.data.totalHits,
      };
    })
    .catch(err => console.log(err));
}
