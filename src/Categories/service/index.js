import { config } from './config';
import { getCatInfo } from '../../Cats/service';

import createGetCategoriesUseCase from './createGetCategoriesUseCase';

const getCategories = createGetCategoriesUseCase(config, getCatInfo);

export { getCategories };
