import React from 'react';
import styles from './styles/cat.module.css';

const Cat = ({ id, image }) => {
  return (
    <div key={id} className={styles.cat__item}>
      <img src={image} className={styles.cat__item__image} alt="cat" />
    </div>
  );
};

export default Cat;
