import { getCatInfo } from '../../Cats/service/getCats';

const {
    REACT_APP_API_BASE_URL: api_url,
    REACT_APP_API_KEY: api_key
} = process.env;
const endpoint = `${api_url}/categories`;
const headers = { headers: { 'x-api-key': api_key } };

export const getCategories = {
    execute() {
        return fetch(endpoint, headers)
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
    }
};
