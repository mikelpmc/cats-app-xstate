import { config } from './config';

import createGetCatInfoUseCase from './createGetCatInfoUseCase';
import createGetCatsUseCase from './createGetCatsUseCase';

const getCatInfo = createGetCatInfoUseCase(config);
const getCats = createGetCatsUseCase(getCatInfo);

export { getCats, getCatInfo };
