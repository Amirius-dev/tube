import React, { useContext, useState } from "react";
import styles from "./css/accounts.module.css";
import {
  Sidebar,
  Navbar,
  Bottombar,
  Categories,
} from "../components/components";
import { VideoContext } from "../contexts/VideoContext";
import { AccountsContext } from "../contexts/AccountsContext";

const Accounts = () => {
  const { videos, deleteVideosByAccount } = useContext(VideoContext);
  const { accounts, deleteAccount, toggleActiveAccount } =
    useContext(AccountsContext);

  // модалка удаления
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const openDeleteModal = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  const handleDeleteAccount = () => {
    if (!selectedAccount) return;

    deleteVideosByAccount(selectedAccount.id);
    deleteAccount(selectedAccount.id);

    closeDeleteModal();
  };

  return (
    <div
      className={`${styles.all} container-fluid`}
      style={{ minHeight: "100dvh", paddingTop: 0 }}
    >
      <Navbar />
      <Sidebar />

      <div className={`${styles.main} container`}>
        <Categories />

        {/* АККАУНТЫ */}
        <section className="mb-5">
          <h4 className={`mb-3 ${styles.title}`}>Аккаунты</h4>

          {accounts.length === 0 ? (
            <p className={`${styles.noaccs}`}>
              Аккаунтов нет. Добавьте первый через поиск → "add"
            </p>
          ) : (
            <ul className="list-group">
              {accounts.map((acc) => (
                <li
                  key={acc.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center gap-3">
                    <strong>{acc.username}</strong>
                    {acc.isActive && (
                      <span className="badge bg-success">Активный</span>
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className={`btn btn-sm ${
                        acc.isActive ? "btn-success" : "btn-outline-primary"
                      }`}
                      onClick={() => toggleActiveAccount(acc.id)}
                      disabled={acc.isActive}
                    >
                      {acc.isActive ? "Активен" : "Сделать активным"}
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => openDeleteModal(acc)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* МОДАЛКА УДАЛЕНИЯ АККАУНТА */}
      {isModalOpen && selectedAccount && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>
              Удалить аккаунт <strong>{selectedAccount.username}</strong>?
            </h3>

            <strong>
              Все связанные видео будут удалены без возможности восстановления.
            </strong>

            <div className={styles.buttons}>
              <button onClick={handleDeleteAccount} className="btn btn-danger">
                Удалить
              </button>
              <button onClick={closeDeleteModal} className="btn btn-secondary">
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

export default Accounts;
