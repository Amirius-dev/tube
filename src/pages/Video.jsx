import React, { useContext, useMemo } from "react";
import styles from "./css/video.module.css";
import { Navbar, Bottombar } from "../components/components";
import { VideoContext } from "../contexts/VideoContext";
import { useParams, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
const Video = () => {
  const navigate = useNavigate();

  const { videos } = useContext(VideoContext);
  console.log(videos);

  const { id } = useParams();
  const video = videos.find((v) => v.id === id);
  console.log(video);

  const isNavbarWidth = window.innerWidth >= 576;

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
      return `${years} год${getNoun(years, ["", "а", "а", "а", "лет"])} назад`;
    if (months > 0)
      return `${months} месяц${getNoun(months, [
        "",
        "а",
        "а",
        "а",
        "ев",
      ])} назад`;
    if (weeks > 0)
      return `${weeks} недел${getNoun(weeks, ["я", "и", "и", "и", "ь"])} назад`;
    if (diffDays >= 1)
      return `${diffDays} день${getNoun(diffDays, [
        "",
        "я",
        "я",
        "я",
        "ей",
      ])} назад`;
    if (diffHours >= 1)
      return `${diffHours} час${getNoun(diffHours, [
        "",
        "а",
        "а",
        "а",
        "ов",
      ])} назад`;
    if (diffMinutes >= 1)
      return `${diffMinutes} минут${getNoun(diffMinutes, [
        "а",
        "ы",
        "ы",
        "ы",
        "",
      ])} назад`;
    return "только что";
  };

  const getNoun = (number, forms) => {
    number = Math.abs(number);
    if (number % 100 >= 11 && number % 100 <= 14) {
      return forms[4]; // many
    }
    const remainder = number % 10;
    if (remainder === 1) return forms[0]; // singular
    if (remainder >= 2 && remainder <= 4) return forms[1]; // few
    return forms[4]; // many
  };

  const shuffledVideos = useMemo(() => {
    const shuffled = [...videos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [videos]);

  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&controls=1`;

  return (
    <motion.div
      className={styles.all}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={`${styles.all}`}>
        {isNavbarWidth && <Navbar />}
        <div className={`${styles.main}`}>
          <div className={`${styles.right}`}>
            <div className={`${styles.right_video}`}>
              {/* <img src={video.thumbnail} alt="" /> */}
              <iframe
                title={video.title}
                src={embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                frameBorder="0"
                className={styles.videoIframe}
              />
            </div>
            <div className={`${styles.right_desc}`}>
              <div className={`${styles.right_desc_left}`}>
                <h2 className={`${styles.right_desc_left_title}`}>
                  {video.title}
                </h2>
                <div className={`${styles.right_desc_left_info}`}>
                  <img
                    src={video.channelThumbnail}
                    alt={video.channelTitle}
                    className={`${styles.channelAvatar}`}
                  />
                  <div className={`${styles.right_desc_left_info_channelInfo}`}>
                    <h4
                      className={`${styles.right_desc_left_info_channelInfo_title}`}
                    >
                      {video.channelTitle}
                    </h4>
                    <h4
                      className={`${styles.right_desc_left_info_channelInfo_subs}`}
                    >
                      {video.viewCount} подписчиков
                    </h4>
                  </div>
                  <button className={`${styles.right_desc_left_info_toSub}`}>
                    Подписаться
                  </button>
                </div>
              </div>

              <div className={`${styles.right_desc_right}`}>
                <button className={`${styles.right_desc_right_button} btn`}>
                  <i className="fa-solid fa-thumbs-up"></i> <span>489</span>
                  <i className="fa-solid fa-thumbs-down"></i>
                </button>
                <button className={`${styles.right_desc_right_button} btn`}>
                  <i className="fa-solid fa-share"></i> Поделиться
                </button>
                <button
                  className={`${styles.right_desc_right_button} ${styles.right_desc_right_button_cut} btn`}
                >
                  <i className="fa-solid fa-scissors"></i> Создать клип
                </button>
                <button
                  className={`${styles.right_desc_right_button} ${styles.right_desc_right_button_ellipse} btn`}
                >
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
            </div>
          </div>

          <div className={`${styles.left}`}>
            {videos.length === 0 ? (
              <p className={`${styles.noVideos}`}>Нет сохранённых видео</p>
            ) : (
              shuffledVideos.map((video, index) => (
                <div key={`${video.id}-${index}`} className={`${styles.video}`}>
                  <div
                    key={video.id}
                    className={`${styles.video_block}`}
                    onClick={() =>
                      navigate(`/video/${video.id}`, { replace: true })
                    }
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className={`${styles.videoThumbnail}`}
                    />
                    <div className={`${styles.info}`}>
                      <div className={`${styles.info_right}`}>
                        <h3 className={`${styles.title}`}>
                          {video.title || "Some Video"}
                        </h3>
                        <h3 className={`${styles.channelTitle}`}>
                          {video.channelTitle || "Channel Title"}
                        </h3>
                        <h3 className={`${styles.statistics}`}>
                          {video.viewCount || "N/A"} просмотров •{" "}
                          {getTimeAgo(video.publishedAt)}
                        </h3>
                      </div>
                      <div className={`${styles.info_actions}`}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* <Bottombar /> */}
      </div>
    </motion.div>
  );
};

export default Video;
