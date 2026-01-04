import React, { useState, useContext } from "react";
import styles from "./css/bottombar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import {
  side_home,
  side_shorts,
  side_sub,
  side_you,
  side_plus,
} from "../images/images";
import { AccountsContext } from "../contexts/AccountsContext";

const Bottombar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { accounts, toggleActiveAccount } = useContext(AccountsContext);

  const activeAccount = accounts.find((acc) => acc.isActive);

  const toggleMenu = () => {
    if (location.pathname === "/dashboard" || location.pathname === "/accounts") {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={styles.bottombar}>
      <NavLink to="/youtube.com">
        <button className={styles.btn}>
          <img src={side_home} alt="Home" /> Home
        </button>
      </NavLink>

      <NavLink to="/youtube.com">
        <button className={styles.btn}>
          <img src={side_shorts} alt="Shorts" /> Shorts
        </button>
      </NavLink>

      <NavLink to="/youtube.com">
        <button className={`${styles.btn} ${styles.plus}`}>
          <img src={side_plus} alt="Add" />
        </button>
      </NavLink>

      <NavLink to="/youtube.com">
        <button className={styles.btn}>
          <img src={side_sub} alt="Subs" /> Subscriptions
        </button>
      </NavLink>

      <button className={`${styles.btn} ${styles.you}`} onClick={toggleMenu}>
        <img src={side_you} alt="You" /> You
      </button>

      {isOpen && accounts.length > 0 && (
        <div className={styles.accsBlock}>
          <div className={styles.accsBlock_accs}>
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className={`${styles.accsBlock_accs_acc} ${ 
                  acc.isActive ? styles.activeAcc : ""
                }`}
                onClick={() => {
                  toggleActiveAccount(acc.id);
                  setIsOpen(false);
                }}
              >
                <div className={styles.accsBlock_accs_acc_img}>
                  {acc.username[0].toUpperCase()}
                </div>
                <h2 className={styles.accsBlock_accs_acc_username}>
                  {acc.username}
                  {acc.isActive && <span className={styles.checkmark}>✓</span>}
                </h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bottombar;
