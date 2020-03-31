import React, { useContext, useState } from 'react';
import { useService } from '@xstate/react';
import { Redirect } from 'react-router-dom';
import { Context } from '../../App';
import { STATES } from '../machine/catsMachine';
import { EVENTS } from '../../Categories/machine/categoriesMachine';
import Cat from './cat';
import styles from './cats.module.css';

const Cats = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const {
    store: { categoriesMachine }
  } = useContext(Context);

  const [current] = useService(categoriesMachine.current.context.selectedCategory);
  const { cats } = current.context;

  const handleGoHome = e => {
    e.preventDefault();

    categoriesMachine.send(EVENTS.CLEAR_SELECTED_CATEGORY);
    setRedirectToHome(true);
  };

  if (redirectToHome) return <Redirect to="/" />;

  return (
    <div>
      {current.matches(STATES.LOADING) && <p>Loading cats...</p>}
      {current.matches(STATES.FAILURE) && <p>Error loading cats :(</p>}
      {current.matches(STATES.SUCCESS) && (
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
