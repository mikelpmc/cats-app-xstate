const { REACT_APP_API_BASE_URL: api_url, REACT_APP_API_KEY: api_key } = process.env;
const endpoint = `${api_url}/images/search?mime_types=gif,jpg`;
const headers = { headers: { 'x-api-key': api_key } };

export const getCatInfo = categoryId => {
  const categoryEndpoint = `${endpoint}&category_ids=${categoryId}`;

  return fetch(categoryEndpoint, headers)
    .then(res => res.json())
    .then(result => {
      if (!result.length) return '';

      return result[0];
    });
};

export const getCats = (categoryId, count = 8) => {
  return new Promise(async (resolve, reject) => {
    const results = [];

    while (results.length < count) {
      let catInfo;
      try {
        catInfo = await getCatInfo(categoryId);
      } catch (error) {
        console.error(error);
        return reject('Error getting cat image');
      }

      if (!results.length) results.push(catInfo);

      const result = results.find(result => result.id === catInfo.id);

      if (!result) {
        results.push(catInfo);
      }
    }

    return resolve(results);
  });
};
