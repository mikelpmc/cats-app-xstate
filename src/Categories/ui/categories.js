import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { EVENTS, STATES } from '../machine/categoriesMachine';
import { Category } from '../../Category/ui';
import styles from './style.module.css';
import { Context } from '../../App';

export const Categories = () => {
  const {
    store: {
      categoriesMachine: { current, send }
    }
  } = useContext(Context);

  const { categories, selectedCategory, error, retries } = current.context;

  const isIdle = current.matches(STATES.IDLE);
  const isSelectedCategory = current.matches(STATES.CATEGORY_SELECTED);

  useEffect(() => {
    send(EVENTS.FETCH);
  }, [isIdle]);

  const handleRetry = event => {
    send(EVENTS.RETRY);
  };

  const handleSelectCategory = id => {
    send(EVENTS.SELECT_CATEGORY, { id });
  };

  return (
    <main>
      {current.matches(STATES.LOADING) && <p>Loading categories...</p>}
      {current.matches(STATES.FAILURE) && (
        <div>
          <p>{error}</p>
          <button type="button" onClick={handleRetry}>
            Try again
          </button>
          <p>Retries: {retries}</p>
          {retries >= 5 && <p>Max retries reached!</p>}
        </div>
      )}
      {current.matches(STATES.SUCCESS) && (
        <div className={styles.categories__container}>
          {categories.map(({ id, name, image }) => (
            <Category id={id} name={name} image={image} onSelectCategory={handleSelectCategory} />
          ))}
        </div>
      )}

      {isSelectedCategory && <Redirect to={`category/${selectedCategory.machine.context.categoryId}`} />}
    </main>
  );
};
