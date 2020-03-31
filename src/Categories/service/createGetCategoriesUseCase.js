const createGetCategoriesUseCase = (config, getCatInfo) => {
  return fetch(config.endpoint, config.headers)
    .then(res => res.json())
    .then(categories => {
      return Promise.all(
        categories.map(async category => {
          const catInfo = await getCatInfo(category.id);

          return {
            ...category,
            image: catInfo.url
          };
        })
      ).then(results => {
        return results.filter(({ image }) => Boolean(image));
      });
    })
    .catch(error => {
      console.error(error);
      throw new Error('Error fetching categories');
    });
};

export default createGetCategoriesUseCase;
