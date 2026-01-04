import React, { useContext, useMemo, useState } from "react";
import styles from "./css/dash.module.css";
import {
  Sidebar,
  Navbar,
  Bottombar,
  Categories,
} from "../components/components";
import { VideoContext } from "../contexts/VideoContext";

const Dash = () => {
  const { videos, deleteVideo } = useContext(VideoContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleDelete = () => {
    if (selectedVideo) {
      deleteVideo(selectedVideo.id);
      setIsModalOpen(false);
      setSelectedVideo(null);
    }
  }; 

  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const getTimeAgo = (publishedAt) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diff = now - published;
    const mins = Math.floor(diff / (1000 * 60));
    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 365)
      return `${Math.floor(days / 365)} год${getNoun(days / 365)} назад`;
    if (days >= 30)
      return `${Math.floor(days / 30)} месяц${getNoun(days / 30)} назад`;
    if (days >= 7)
      return `${Math.floor(days / 7)} недел${getNoun(days / 7)} назад`;
    if (days >= 1) return `${days} день${getNoun(days)} назад`;
    if (hrs >= 1) return `${hrs} час${getNoun(hrs)} назад`;
    if (mins >= 1) return `${mins} минут${getNoun(mins)} назад`;
    return "только что";
  };

  const getNoun = (number) => {
    const cases = [2, 0, 1, 1, 1, 2];
    const titles = ["", "а", "и"];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[Math.min(number % 10, 5)]
    ];
  };

  const shuffledVideos = useMemo(() => {
    const shuffled = [...videos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [videos]);

  return (
    <div className={styles.all}>
      <Navbar />
      <Sidebar />
      <div className={styles.main}>
        <Categories />

        <div className={styles.videos}>
          <div className={styles.videos_block}>
            {videos.length === 0 ? (
              <p className={styles.noVideos}>Нет сохранённых видео</p>
            ) : (
              shuffledVideos.map((video, index) => (
                <div key={`${video.id}-${index}`} className={styles.video}>
                  <div className={styles.video_block}>
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
                        <h3 className={styles.title}>{video.title}</h3>
                        <h3 className={styles.channelTitle}>
                          {video.channelTitle}
                        </h3>
                        <h3 className={styles.statistics}>
                          {video.viewCount} просмотров •{" "}
                          {getTimeAgo(video.publishedAt)}
                        </h3>
                      </div>
                      <div className={styles.info_actions}>
                        <button onClick={() => openModal(video)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {isModalOpen && selectedVideo && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>
              Удалить видео <strong>{selectedVideo.title}</strong>?
            </h3>
            <div className={styles.buttons}>
              <button onClick={handleDelete} className="btn btn-success">
                Да
              </button>
              <button onClick={closeModal} className="btn btn-danger">
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <Bottombar />
    </div>
  );
};

export default Dash;
