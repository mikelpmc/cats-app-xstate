import React, { createContext } from 'react';
import { useMachine } from '@xstate/react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createCategoriesMachine } from './Categories/machine/categoriesMachine';
import { getCategories } from './Categories/service/getCategories';
import { Categories } from './Categories/ui/categories';
import { Cats } from './Cats/ui';
import './styles.css';

export const Context = createContext();
const categoriesMachine = createCategoriesMachine(getCategories);

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
      <div>
        <h1>Cats gifs&images</h1>
        <h2>
          Made with{' '}
          <span role="img" aria-label="Snowman">
            ❤️
          </span>{' '}
          by Catittude, asix94 and lynott
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
      </div>
    </Context.Provider>
  );
}

export default App;
