import React, { useContext, useState } from 'react';
import { useService } from '@xstate/react';
import { Redirect } from 'react-router-dom';
import { Context } from '../../App';
import { CATS_STATES } from '../machine';
import { CATEGORIES_EVENTS } from '../../Categories/machine';
import Cat from './cat';
import styles from './styles/cats.module.css';

const Cats = () => {
  const {
    store: { categoriesMachine }
  } = useContext(Context);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const [current] = useService(categoriesMachine.current.context.selectedCategory);
  const { cats } = current.context;

  const handleGoHome = e => {
    e.preventDefault();

    categoriesMachine.send(CATEGORIES_EVENTS.CLEAR_SELECTED_CATEGORY);
    setRedirectToHome(true);
  };

  if (redirectToHome) return <Redirect to="/" />;

  return (
    <div>
      {current.matches(CATS_STATES.LOADING) && <p>Loading cats...</p>}
      {current.matches(CATS_STATES.FAILURE) && <p>Error loading cats :(</p>}
      {current.matches(CATS_STATES.SUCCESS) && (
        <section>
          <button type="button" onClick={e => handleGoHome(e)} className={styles.cats__button}>
            Go home
          </button>
          <div className={styles.cats__container}>
            {cats.map(({ id, url }) => (
              <Cat id={id} image={url} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Cats;
