import React from "react";
import styles from "./css/sidebar.module.css";
import { NavLink } from "react-router-dom";
import {
  logo,
  side_home,
  side_shorts,
  side_sub,
  side_special,
  side_history,
  side_liked,
  side_playlists,
  side_watch_later,
  side_your_courses,
  side_your_videos,
  side_block_subs,
} from "../images/images";

const Sidebar = () => {
  return (
    <div className={`${styles.sidebar}`}>
      <div className={`${styles.top_part}`}>
        <div className={`${styles.top_part_1} ${styles.top_part_part}`}>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn} ${styles.btn_active}`}>
              <img src={side_home} alt="Главная" /> Главная
            </button>
          </NavLink>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn} `}>
              <img src={side_shorts} alt="Shorts" /> Shorts
            </button>
          </NavLink>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn} `}>
              <img src={side_sub} alt="Подписки" /> Подписки
            </button>
          </NavLink>
          <div className={`${styles.top_part_1_adaptive}`}>
            <NavLink to={"/youtube.com"}>
              <button className={`${styles.btn} `}>
                <img src={side_shorts} alt="Вы" /> Вы
              </button>
            </NavLink>
            <NavLink to={"/youtube.com"}>
              <button className={`${styles.btn} `}>
                <img src={side_sub} alt="Скачанные" /> Скачанные
              </button>
            </NavLink>
          </div>
        </div>
        <div className={`${styles.top_part_part}`}>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn} ${styles.btn_special}`}>
              Вы <img src={side_special} alt="..." />
            </button>
          </NavLink>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn}`}>
              <img src={side_history} alt="История" /> История
            </button>
          </NavLink>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn} `}>
              <img src={side_playlists} alt="Плейлисты" /> Плейлисты
            </button>
          </NavLink>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn} `}>
              <img src={side_your_videos} alt="Ваши видео" /> Ваши видео
            </button>
          </NavLink>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn}`}>
              <img src={side_your_courses} alt="Ваши курсы" /> Ваши курсы
            </button>
          </NavLink>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn} `}>
              <img src={side_watch_later} alt="Смотреть позже" /> Смотреть позже
            </button>
          </NavLink>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn} `}>
              <img src={side_liked} alt="Понравившиеся" /> Понравившиеся
            </button>
          </NavLink>
        </div>
      </div>

      <div className={`${styles.block}`}>
        <div className={`${styles.block_part}`}>
          <NavLink to={"/youtube.com"}>
            <button className={`${styles.btn} ${styles.btn_special}`}>
              Подписки <img src={side_special} alt="..." />
            </button>
          </NavLink>
          <NavLink to={"/youtube.com"}>
            <img src={side_block_subs} alt="Subs" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
