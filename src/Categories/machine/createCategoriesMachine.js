import { Machine, assign, spawn } from 'xstate';
import { catsMachine } from '../../Cats/machine';
import STATES from './states';
import EVENTS from './events';

const canFetch = context => {
  return context.retries < 5;
};

const createCategoriesMachine = getCategories =>
  Machine({
    id: 'categoriesMachine',
    initial: 'idle',
    context: {
      categories: [],
      selectedCategory: null,
      error: null,
      retries: 0
    },
    states: {
      [STATES.IDLE]: {
        on: {
          [EVENTS.FETCH]: { target: STATES.LOADING }
        }
      },
      [STATES.LOADING]: {
        invoke: {
          id: 'fetchCategories',
          src: getCategories,
          onDone: {
            target: STATES.SUCCESS,
            actions: assign({
              categories: (context, event) => {
                const categories = event.data;
                return categories;
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
      [STATES.SUCCESS]: {
        on: {
          [EVENTS.SELECT_CATEGORY]: {
            target: STATES.CATEGORY_SELECTED,
            actions: assign((context, event) => {
              const catMachine = spawn(catsMachine(event.id));

              return { selectedCategory: catMachine };
            })
          }
        }
      },
      [STATES.FAILURE]: {
        on: {
          [EVENTS.RETRY]: {
            target: STATES.LOADING,
            cond: canFetch,
            actions: assign({
              retries: (context, _) => context.retries + 1
            })
          }
        }
      },
      [STATES.CATEGORY_SELECTED]: {
        on: {
          [EVENTS.CLEAR_SELECTED_CATEGORY]: {
            target: STATES.IDLE,
            actions: assign((context, _) => ({
              selectedCategory: null
            }))
          }
        }
      }
    }
  });

export default createCategoriesMachine;
