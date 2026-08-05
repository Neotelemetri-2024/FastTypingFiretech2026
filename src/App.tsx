import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/theme";
import { useEffect, useState } from "react";
import MainLayout from "./layout/mainlayout";
import Home from "./pages/home";
import Score from "./pages/score";
import NotFound from "./pages/notfound";
import Loading from "./components/loading";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/score" element={<Score />} />
          </Route>
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
