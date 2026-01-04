import React, { createContext, useState, useEffect } from "react";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem("savedVideos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedVideos", JSON.stringify(videos));
  }, [videos]);

  const addVideo = (video) => {
    setVideos((prev) =>
      prev.some((v) => v.id === video.id) ? prev : [...prev, video]
    );
  };

  const deleteVideo = (id) => {
    setVideos((prev) => prev.filter((video) => video.id !== id));
  };

  const deleteVideosByAccount = (accountId) => {
    setVideos((prev) => prev.filter((video) => video.accountId !== accountId));
  };

  return (
    <VideoContext.Provider
      value={{ videos, addVideo, deleteVideo, deleteVideosByAccount }}
    >
      {children}
    </VideoContext.Provider>
  );
};
