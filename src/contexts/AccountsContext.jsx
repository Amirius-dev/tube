import React, { createContext, useState, useEffect } from "react";

export const AccountsContext = createContext();

export const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem("accounts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  const addAccount = (username) => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) return;

    // Проверка на дубликат по имени (регистронезависимо)
    const exists = accounts.some(
      (acc) => acc.username.toLowerCase() === trimmedUsername.toLowerCase()
    );
    if (exists) return;

    const newAccount = {
      id: Date.now().toString(), // уникальный id
      username: trimmedUsername,
      isActive: accounts.length === 0, // первый аккаунт сразу активный
    };

    setAccounts((prev) => [...prev, newAccount]);
  };

  const toggleActiveAccount = (id) => {
    setAccounts((prev) =>
      prev.map((acc) => ({
        ...acc,
        isActive: acc.id === id,
      }))
    );
  };

  const deleteAccount = (id) => {
    setAccounts((prev) => {
      const filtered = prev.filter((acc) => acc.id !== id);
      // Если удалили активный аккаунт и остались другие — делаем первый активным
      if (filtered.length > 0 && !filtered.some((acc) => acc.isActive)) {
        filtered[0].isActive = true;
      }
      return filtered;
    });
  };

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        addAccount,
        toggleActiveAccount,
        deleteAccount,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};
