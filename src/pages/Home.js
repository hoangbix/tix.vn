import React from "react";
import Slide from "../components/Slide/HeroSlide";
import Navbar from "../components/Navbar/Navbar";
import ListFilm from "../components/ListFilm/ListFilm";
import LoadRapPhim from "../components/loadRapPhim/LoadRapPhim";
import News from "../components/news/News";
import App from "../components/App/App";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <ListFilm />
      <LoadRapPhim />
      <News />
      <App />
      <Footer />
    </>
  );
};

export default Home;
