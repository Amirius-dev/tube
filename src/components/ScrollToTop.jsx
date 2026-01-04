import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Компонент, который автоматически прокручивает страницу вверх
 * при каждом изменении маршрута.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // можно поставить "smooth", если хочешь анимацию
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
