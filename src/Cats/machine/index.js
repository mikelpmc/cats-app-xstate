import CATS_STATES from './states';
import createCatsMachine from './createCatsMachine';
import { getCats } from '../service';

const catsMachine = createCatsMachine(getCats);

export { catsMachine, CATS_STATES };
