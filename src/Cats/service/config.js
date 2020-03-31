const { REACT_APP_API_BASE_URL: api_url, REACT_APP_API_KEY: api_key } = process.env;

const endpoint = `${api_url}/images/search?mime_types=gif,jpg`;
const headers = { headers: { 'x-api-key': api_key } };

export const config = {
  endpoint,
  headers
};
