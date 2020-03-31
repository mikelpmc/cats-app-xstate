import { Machine, assign } from 'xstate';
import STATES from './states';

const createCatsMachine = getCats => categoryId =>
  Machine({
    id: 'catsMachine',
    initial: STATES.IDLE,
    context: {
      categoryId,
      cats: []
    },
    states: {
      [STATES.IDLE]: {
        on: {
          '': { target: STATES.LOADING }
        }
      },
      [STATES.LOADING]: {
        invoke: {
          id: 'fetchCats',
          src: (context, _) => getCats(context.categoryId),
          onDone: {
            target: STATES.SUCCESS,
            actions: assign({
              cats: (context, event) => {
                const cats = event.data;
                return cats;
              }
            })
          },
          onError: {
            target: STATES.FAILURE,
            actions: assign({
              error: (context, event) => {
                return event.data.message;
              }
            })
          }
        }
      },
      [STATES.SUCCESS]: {},
      [STATES.FAILURE]: {}
    }
  });

export default createCatsMachine;
