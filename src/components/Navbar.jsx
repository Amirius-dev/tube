import React, { useState, useContext } from "react";
import styles from "./css/navbar.module.css";
import { logo, right_navbar, voice } from "../images/images";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { VideoContext } from "../contexts/VideoContext";
import { AccountsContext } from "../contexts/AccountsContext";

const AccountsModal = ({ isOpen, onClose, onSubmit }) => {
  const [accountInput, setAccountInput] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = accountInput.trim();
    if (trimmed.length < 3) {
      setError("Название аккаунта должно состоять из 3 и более символов");
      return;
    }
    onSubmit(trimmed);
    setAccountInput("");
    setError("");
    onClose();
  };
 
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Добавить аккаунт</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Название аккаунта"
            value={accountInput}
            onChange={(e) => setAccountInput(e.target.value)}
            className="form-control"
            autoFocus
          />
          {error && <p className="text-danger mt-2">{error}</p>}
          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Добавить
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [videoLink, setVideoLink] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = videoLink.trim();
    if (!trimmed) {
      setError("Введите ссылку на видео");
      return;
    }
    onSubmit(trimmed);
    setVideoLink("");
    setError("");
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Добавить видео</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ссылка на YouTube видео"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="form-control"
            autoFocus
          />
          {error && <p className="text-danger mt-2">{error}</p>}
          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Добавить
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { addVideo } = useContext(VideoContext);
  const { accounts, addAccount } = useContext(AccountsContext);

  // Определяем текущий активный аккаунт
  const activeAccount = accounts.find((acc) => acc.isActive);

  const API_KEY = "AIzaSyB0t55PNzSHf-_tXnDYEnqM5HeYg7vFdM4";

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openAccountsModal = () => setIsAccountsModalOpen(true);
  const closeAccountsModal = () => setIsAccountsModalOpen(false);

  // Извлечение video ID из ссылки
  const getVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddVideo = async (link) => {
    if (!activeAccount) {
      alert("Ошибка: сначала выберите активный аккаунт на странице /accounts");
      return;
    }

    const videoId = getVideoId(link);
    if (!videoId) {
      alert("Некорректная ссылка на YouTube видео");
      return;
    }

    try {
      const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`
      );
      const videoData = await videoRes.json();

      if (!videoData.items || videoData.items.length === 0) {
        alert("Видео не найдено или недоступно");
        return;
      }

      const video = videoData.items[0];
      const snippet = video.snippet;
      const stats = video.statistics;

      // Получаем аватарку канала
      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${snippet.channelId}&key=${API_KEY}`
      );
      const channelData = await channelRes.json();

      const channelThumb =
        channelData.items?.[0]?.snippet?.thumbnails?.medium?.url ||
        channelData.items?.[0]?.snippet?.thumbnails?.default?.url ||
        "";

      const videoToSave = {
        id: videoId,
        title: snippet.title,
        thumbnail: snippet.thumbnails.medium.url,
        channelTitle: snippet.channelTitle,
        channelThumbnail: channelThumb,
        viewCount: stats?.viewCount || "0",
        publishedAt: snippet.publishedAt,
        url: link,
        accountId: activeAccount.id, // Правильная привязка по ID
      };

      addVideo(videoToSave);
      // alert(`Видео "${snippet.title}" успешно добавлено!`);
    } catch (err) {
      console.error("Ошибка при добавлении видео:", err);
      alert("Произошла ошибка при загрузке данных видео");
    }
  };

  const handleAddAccount = (username) => {
    addAccount(username);
    // alert(
    //   `Аккаунт "${username}" добавлен! Перейдите в /accounts, чтобы сделать его активным.`
    // );
  };
 
  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim().toLowerCase();

    if (query === "add" && location.pathname === "/dashboard") {
      openModal();
    } else if (query === "add" && location.pathname === "/accounts") {
      openAccountsModal();
    } else if (query === "get" && location.pathname === "/dashboard") {
      navigate("/get_links");
    } else if (query === "accounts") {
      navigate("/accounts");
    } else if (query === "dashboard") {
      navigate("/dashboard");
    }
    setSearch("");
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.block}>
          <i className={`fa-solid fa-bars ${styles.opener}`}></i>
          <NavLink to="/youtube.com">
            <div className={styles.logoWrapper}>
              <img src={logo} alt="logo" className={styles.logo} />
            </div>
          </NavLink>
        </div>

        <form onSubmit={handleSearch} className={styles.block}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Введите запрос"
            className={`${styles.poisk} form-control`}
          />
          <button type="submit" className={styles.poisk_btn}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <div className={styles.logoWrapper}>
            <img src={voice} alt="voice" className={styles.voice} />
          </div>
        </form>

        <div className={styles.block}>
          <div className={styles.logoWrapper}>
            <img
              src={right_navbar}
              alt="profile"
              className={styles.right_navbar}
            />
          </div>
        </div>
      </div>

      {/* Модалка добавления видео */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddVideo}
      />

      {/* Модалка добавления аккаунта */}
      <AccountsModal
        isOpen={isAccountsModalOpen}
        onClose={closeAccountsModal}
        onSubmit={handleAddAccount}
      />
    </>
  );
};

export default Navbar;
