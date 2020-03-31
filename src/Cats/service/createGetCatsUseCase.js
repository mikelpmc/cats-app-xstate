const createGetCatsUseCase = getCatInfo => (categoryId, count = 8) => {
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

export default createGetCatsUseCase;
