import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../App.css";
import HeaderV2 from "../../components/Layout/Header/HeaderV2";
import Footer from "../../components/Layout/Footer/Footer";
import Newsletter from "../../components/Layout/Newsletter/Newsletter";
import NewsContent from "../../components/News/NewsContent";

export default function ProductDetail(props) {
  const [news, setNews] = useState();

  useEffect(() => {
    axios
      .get(`http://pe.heromc.net:4000/news/` + props.match.params.id)
      .then((res) => {
        setNews(res.data);
      });
  }, [props.match.params.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div className="ProductDetail">
      <HeaderV2 />
      <NewsContent news={news} />
      <Newsletter />
      <Footer />
    </div>
  );
}
