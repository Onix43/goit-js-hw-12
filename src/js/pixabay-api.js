import axios from 'axios';

export async function getImageByQuery(query, page = 1) {
  const url = `https://pixabay.com/api/`;
  const response = await axios.get(url, {
    params: {
      key: `53503669-da6de2716d59628c83ce4fe17`,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 15,
    },
  });
  return {
    hits: response.data.hits,
    totalHits: response.data.totalHits,
  };
}
