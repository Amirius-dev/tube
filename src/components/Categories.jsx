import React from "react";
import styles from "./css/categories.module.css";

const Categories = () => {
  return (
    <div className={`${styles.categories}`}>
      <div className={`${styles.buttons}`}>
        <h3 className={`${styles.button} ${styles.active_button}`}>Все</h3>
        <h3 className={`${styles.button}`}>Музыка</h3>
        <h3 className={`${styles.button}`}>Подкасты</h3>
        <h3 className={`${styles.button}`}>Видеоигры</h3>
        <h3 className={`${styles.button}`}>Джемы</h3>
        <h3 className={`${styles.button}`}>Сейчас в эфире</h3>
        <h3 className={`${styles.button}`}>Футбол</h3>
        <h3 className={`${styles.button}`}>Спортивные видеоигры</h3>
        <h3 className={`${styles.button}`}>Анимации</h3>
        <h3 className={`${styles.button}`}>Недавно опубликованные</h3>
        <h3 className={`${styles.button}`}>Просмотрено</h3>
        <h3 className={`${styles.button}`}>Новое для вас</h3>
      </div>
    </div>
  );
};

export default Categories;
