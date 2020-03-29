import React from 'react';
import styles from './styles.module.css';

const Category = ({ id, name, image, onSelectCategory }) => {
    const handleSelectCategory = id => {
        onSelectCategory(id);
    };

    return (
        <div key={id} className={styles.category__item}>
            <img
                src={image}
                alt={name}
                className={styles.category__item__image}
            />
            <button
                type="button"
                className={styles.category__item__button}
                onClick={() => handleSelectCategory(id)}
            >
                {name}
            </button>
        </div>
    );
};

export default Category;
