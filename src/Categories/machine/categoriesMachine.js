import { Machine, assign, spawn } from 'xstate';
import { createCatsMachine } from '../../Cats/machine/catsMachine';

export const STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILURE: 'failure',
  CATEGORY_SELECTED: 'category_selected'
};

export const EVENTS = {
  FETCH: 'fetch',
  RETRY: 'retry',
  SELECT_CATEGORY: 'select_category',
  CLEAR_SELECTED_CATEGORY: 'clear_selected_category'
};

const canFetch = (context, event) => {
  return context.retries < 5;
};

export const createCategoriesMachine = getCategories =>
  Machine({
    id: 'categories',
    initial: 'idle',
    context: {
      categories: [],
      error: null,
      retries: 0,
      selectedCategory: null
    },
    states: {
      [STATES.IDLE]: {
        on: {
          [EVENTS.FETCH]: { target: STATES.LOADING }
        }
      },
      [STATES.LOADING]: {
        invoke: {
          id: 'categories',
          src: getCategories.execute,
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
              const catMachine = spawn(createCatsMachine(event.id));

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
