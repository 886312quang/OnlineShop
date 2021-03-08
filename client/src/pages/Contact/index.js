import React, { useEffect } from "react";
import "../../App.css";
import Newsletter from "../../components/Layout/Newsletter/Newsletter";
import Footer from "../../components/Layout/Footer/Footer";
import BannerV2 from "../../components/Banner/BannerV2.js";
import Header from "../../components/Layout/Header/Header";
import bg from "../../assets/contact3.jpg";
import ContactBody from "../../components/Contact/ContactBody.js";
import GetInTouch from "../../components/Contact/GetInTouch";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div className="Contact">
      <Header />
      <BannerV2 bannerImage={bg} position={"0px"} />
      <ContactBody />
      <GetInTouch />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default Contact;
