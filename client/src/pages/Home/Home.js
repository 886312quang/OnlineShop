import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header/Header";
import Banner from "../../components/Banner/Banner";
import RecommendBanner from "../../components/Home/RecommendBanner";
import Newsletter from "../../components/Layout/Newsletter/Newsletter";
import FashionNews from "../../components/Home/FashionNews";
import HomeTab from "../../components/Home/HomeTab";
import Footer from "../../components/Layout/Footer/Footer";
import axios from "axios";
import "../../App.css";

const Home = () => {
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    axios.get(`http://pe.heromc.net:4000/collection`).then((res) => {
      setCollection(res.data);
    });
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);
  return (
    <div className="Home">
      <Header />
      <Banner collection={collection} />
      <RecommendBanner />
      <HomeTab />
      <FashionNews />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
