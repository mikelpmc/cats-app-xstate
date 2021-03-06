import React, { createContext } from 'react';
import { useMachine } from '@xstate/react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { categoriesMachine } from './Categories/machine';
import { Categories } from './Categories/ui';
import { Cats } from './Cats/ui';
import './styles.css';

export const Context = createContext();

function App() {
  const [current, send] = useMachine(categoriesMachine);
  const { selectedCategory } = current.context;

  return (
    <Context.Provider
      value={{
        store: {
          categoriesMachine: { current, send }
        }
      }}
    >
      <main>
        <h1>Cats gifs&images</h1>
        <h2>
          Made with{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>{' '}
          by Catittude, Asix94 and Lynott
        </h2>

        <Switch>
          <Route exact path="/">
            <Categories />
          </Route>
          <Route exact path="/category/:id">
            {selectedCategory ? <Cats /> : <Redirect to="/" />}
          </Route>
          <Route>
            <p>Route Not found</p>
          </Route>
        </Switch>
      </main>
    </Context.Provider>
  );
}

export default App;
