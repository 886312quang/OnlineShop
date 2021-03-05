import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header/Header";
import Banner from "../../components/Banner/Banner";
import Footer from "../../components/Layout/Footer/Footer";
import axios from "axios";
import "../../App.css";

const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Banner />
    </div>
  );
};

export default Home;
