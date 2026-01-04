import React, { useContext, useState, useEffect } from "react";
import styles from "./css/getLinks.module.css";
import {
  Sidebar,
  Navbar,
  Bottombar,
  Categories,
} from "../components/components";
import { VideoContext } from "../contexts/VideoContext";

const GetLinks = () => {
  const { videos } = useContext(VideoContext);
  const [viewMode, setViewMode] = useState(null); // 'json' | 'table' | null
  const [copied, setCopied] = useState(false);

  const handleShowJson = () => {
    const jsonText = JSON.stringify(videos, null, 2);
    navigator.clipboard.writeText(jsonText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    setViewMode("json");
  };

  useEffect(() => {
    const buttons = document.querySelectorAll(".copy-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        navigator.clipboard
          .writeText(value)
          .then(() => {
            button.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
              button.innerHTML = '<i class="fa-regular fa-copy"></i>';
            }, 1500);
          })
          .catch(() => {
            alert("❌ Не удалось скопировать");
          });
      });
    });

    return () => {
      buttons.forEach((button) => {
        button.replaceWith(button.cloneNode(true)); // удаляет все слушатели
      });
    };
  }, [viewMode]);

  return (
    <div
      className={`${styles.all} container-fluid`}
      style={{ minHeight: "100dvh", height: "max-content", paddingTop: "0rem" }}
    >
      <Navbar />
      <Sidebar />
      <div className={`${styles.main} container`}>
        <Categories />

        <div className="mb-2">
          <button className="btn btn-primary me-2" onClick={handleShowJson}>
            📋 Показать как JSON (и скопировать)
          </button>
          <button
            className="btn btn-success"
            onClick={() => setViewMode("table")}
          >
            📊 Показать таблицу
          </button>
          {copied && (
            <div className="alert alert-success mt-3 p-2" role="alert">
              ✅ JSON скопирован в буфер обмена!
            </div>
          )}
        </div>

        {viewMode === "json" && (
          <pre
            className="bg-light p-3 rounded border"
            style={{
              whiteSpace: "pre-wrap",
              //   maxHeight: "500px",
              overflowY: "auto",
              fontSize: "14px",
            }}
          >
            {JSON.stringify(videos, null, 2)}
          </pre>
        )}

        {viewMode === "table" && (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Channel</th>
                  <th>Views</th>
                  <th>Thumbnail</th>
                  <th>Link</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video, index) => (
                  <tr key={video.id}>
                    <td>{index + 1}</td>
                    <td>{video.title}</td>
                    <td>{video.channelTitle}</td>
                    <td>{video.viewCount}</td>
                    <td>
                      <img
                        src={video.thumbnail}
                        alt="thumb"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        {video.url}
                        <button
                          className="btn btn-sm btn-outline-secondary copy-btn"
                          data-value={video.url}
                        >
                          <i className="fa-regular fa-copy"></i>
                        </button>
                      </div>
                    </td>
                    <td>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        Перейти →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Bottombar />
    </div>
  );
};

export default GetLinks;
