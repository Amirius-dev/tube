import React, { useContext, useMemo } from "react";
import styles from "./css/videos.module.css";
import {
  Sidebar,
  Navbar,
  Bottombar,
  Categories,
} from "../components/components";
import { VideoContext } from "../contexts/VideoContext";
import { AccountsContext } from "../contexts/AccountsContext"; // Добавили!
import { Link } from "react-router-dom";

const Videos = () => {
  const { videos } = useContext(VideoContext);
  const { accounts } = useContext(AccountsContext);

  // Находим активный аккаунт
  const activeAccount = accounts.find((acc) => acc.isActive);

  // Фильтруем видео только от активного аккаунта
  const filteredVideos = useMemo(() => {
    if (!activeAccount) return [];
    return videos.filter((video) => video.accountId === activeAccount.id);
  }, [videos, activeAccount]);

  // Перемешиваем только отфильтрованные видео
  const shuffledVideos = useMemo(() => {
    const shuffled = [...filteredVideos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [filteredVideos]);

  const getTimeAgo = (publishedAt) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffMs = now - published;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    const years = Math.floor(diffDays / 365);
    const months = Math.floor(diffDays / 30);
    const weeks = Math.floor(diffDays / 7);

    if (years > 0)
      return `${years} год${getNoun(years, ["", "а", "лет"])} назад`;
    if (months > 0)
      return `${months} месяц${getNoun(months, ["", "а", "ев"])} назад`;
    if (weeks > 0)
      return `${weeks} недел${getNoun(weeks, ["я", "и", "ь"])} назад`;
    if (diffDays >= 1)
      return `${diffDays} день${getNoun(diffDays, ["", "я", "дней"])} назад`;
    if (diffHours >= 1)
      return `${diffHours} час${getNoun(diffHours, ["", "а", "ов"])} назад`;
    if (diffMinutes >= 1)
      return `${diffMinutes} минут${getNoun(diffMinutes, [
        "а",
        "ы",
        "",
      ])} назад`;
    return "только что";
  };

  const getNoun = (number, forms) => {
    // forms: [singular, few, many] — например ["", "а", "ов"]
    number = Math.abs(number);
    if (number % 100 >= 11 && number % 100 <= 14) return forms[2];
    const remainder = number % 10;
    if (remainder === 1) return forms[0];
    if (remainder >= 2 && remainder <= 4) return forms[1];
    return forms[2];
  };

  return (
    <div className={styles.all}>
      <Navbar />
      <Sidebar />

      <div className={styles.main}>
        <Categories />

        <div className={styles.videos}>
          <div className={styles.videos_block}>
            {!activeAccount ? (
              <div className={styles.noAccountMessage}>
                <p className={styles.noVideos}>
                  <i className="fa-solid fa-user-slash fa-2x mb-3"></i>
                  <br />
                  Активный аккаунт не выбран
                </p>
                <p className={`${styles.title} p-3 pt-0`}>
                  Перейдите в <strong>/accounts</strong> или нажмите на иконку
                  "You" внизу, чтобы выбрать аккаунт.
                </p>
              </div>
            ) : filteredVideos.length === 0 ? (
              <p className={styles.noVideos}>
                Нет видео в аккаунте <strong>"{activeAccount.username}"</strong>
                <br />
                <small className={`${styles.title} mt-3`}>
                  Добавьте видео через поиск → "add"
                </small>
              </p>
            ) : (
              shuffledVideos.map((video, index) => (
                <div key={`${video.id}-${index}`} className={styles.video}>
                  <Link
                    to={`/video/${video.id}`}
                    className={styles.video_block}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className={styles.videoThumbnail}
                    />
                    <div className={styles.info}>
                      <div className={styles.info_left}>
                        <img
                          src={video.channelThumbnail}
                          alt={video.channelTitle}
                          className={styles.channelAvatar}
                        />
                      </div>
                      <div className={styles.info_right}>
                        <h3 className={styles.title}>
                          {video.title || "Без названия"}
                        </h3>
                        <h3 className={styles.channelTitle}>
                          {video.channelTitle}
                        </h3>
                        <h3 className={styles.statistics}>
                          {video.viewCount} просмотров •{" "}
                          {getTimeAgo(video.publishedAt)}
                        </h3>
                      </div>
                      <div className={styles.info_actions}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Bottombar />
    </div>
  );
};

export default Videos;
