import { Machine, assign } from 'xstate';
import { getCats } from '../service/getCats';

export const STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILURE: 'failure'
};

export const EVENTS = {
    FETCH: 'fetch',
    RETRY: 'retry'
};

const createCatsMachine = categoryId =>
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
                    [EVENTS.FETCH]: { target: STATES.LOADING }
                }
            },
            [STATES.LOADING]: {
                invoke: {
                    id: 'cats',
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

export { createCatsMachine };
