import { Routes, Route, Navigate } from "react-router-dom";
import { Shorts, Videos, Video } from "./pages/pages";
import Dash from "./Dashboard/Dash";
import GetLinks from "./Dashboard/GetLinks";
import ScrollToTop from "./components/ScrollToTop";
import Accounts from "./Dashboard/Accounts";

function App() {
  return (
    <>
      {/* Компонент, который сбрасывает скролл при каждом переходе */}
      <ScrollToTop /> 

      <Routes>
        {/* Панель управления */}
        <Route path="/dashboard" element={<Dash />} />
        <Route path="/get_links" element={<GetLinks />} />
        <Route path="/accounts" element={<Accounts />} />

        {/* Основные страницы */}
        <Route path="/youtube.com" element={<Videos />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/shorts" element={<Shorts />} />

        {/* Редирект на главную, если путь не найден */}
        <Route path="*" element={<Navigate to="/youtube.com" replace />} />
      </Routes>
    </>
  );
}

export default App;
