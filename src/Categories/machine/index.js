import CATEGORIES_STATES from './states';
import CATEGORIES_EVENTS from './events';
import createCategoriesMachine from './createCategoriesMachine';
import { getCategories } from '../service';

const categoriesMachine = createCategoriesMachine(getCategories);

export { categoriesMachine, CATEGORIES_STATES, CATEGORIES_EVENTS };
