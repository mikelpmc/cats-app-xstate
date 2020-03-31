import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { CATEGORIES_STATES, CATEGORIES_EVENTS } from '../machine/';
import { Context } from '../../App';
import Category from './category';
import styles from './styles/categories.module.css';

const Categories = () => {
  const {
    store: {
      categoriesMachine: { current, send }
    }
  } = useContext(Context);

  const { categories, selectedCategory, error, retries } = current.context;

  useEffect(() => {
    send(CATEGORIES_EVENTS.FETCH);
  }, []);

  const handleRetry = event => {
    send(CATEGORIES_EVENTS.RETRY);
  };

  const handleSelectCategory = id => {
    send(CATEGORIES_EVENTS.SELECT_CATEGORY, { id });
  };

  return (
    <div>
      {current.matches(CATEGORIES_STATES.LOADING) && <p>Loading categories...</p>}
      {current.matches(CATEGORIES_STATES.FAILURE) && (
        <div>
          <p>{error}</p>
          <button type="button" onClick={handleRetry}>
            Try again
          </button>
          <p>Retries: {retries}</p>
          {retries >= 5 && <p>Max retries reached!</p>}
        </div>
      )}
      {current.matches(CATEGORIES_STATES.SUCCESS) && (
        <div className={styles.categories__container}>
          {categories.map(({ id, name, image }) => (
            <Category id={id} name={name} image={image} onSelectCategory={handleSelectCategory} />
          ))}
        </div>
      )}
      {current.matches(CATEGORIES_STATES.CATEGORY_SELECTED) && (
        <Redirect to={`category/${selectedCategory.machine.context.categoryId}`} />
      )}
    </div>
  );
};

export default Categories;
