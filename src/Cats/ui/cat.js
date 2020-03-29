import React from 'react';
import styles from './cat.module.css';

const Cat = ({ id, image }) => {
    return (
        <div key={id} className={styles.cat__item}>
            <img src={image} className={styles.cat__item__image} />
        </div>
    );
};

export default Cat;
