const createGetCatInfoUseCase = config => categoryId => {
  const categoryEndpoint = `${config.endpoint}&category_ids=${categoryId}`;

  return fetch(categoryEndpoint, config.headers)
    .then(res => res.json())
    .then(result => {
      if (!result.length) return '';

      return result[0];
    });
};

export default createGetCatInfoUseCase;
