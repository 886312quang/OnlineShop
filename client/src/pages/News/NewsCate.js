import React, { useEffect } from "react";
import "../../App.css";
import NewsBanner from "../../components/Banner/NewsBanner.js";
import Header from "../../components/Layout/Header/Header";
import Newsletter from "../../components/Layout/Newsletter/Newsletter";
import Footer from "../../components/Layout/Footer/Footer";
import NewsMain from "../../components/News/NewsMain";

export default function NewsCate() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);
  return (
    <div className="NewsPages">
      <Header />
      <NewsBanner />
      <NewsMain />
      <Newsletter />
      <Footer />
    </div>
  );
}
