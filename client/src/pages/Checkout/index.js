import React, { useEffect } from "react";
import "../../App.css";
import BannerV4 from "../../components/Banner/BannerV4";
import CheckoutBody from "../../components/Checkout/Checkout";
import Header from "../../components/Layout/Header/Header";
import Footer from "../../components/Layout/Footer/Footer";
import Newsletter from "../../components/Layout/Newsletter/Newsletter";

function Checkout() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div className="Contact">
      <Header />
      <BannerV4 bannerImage={""} collectionTitle={"Checkout"} />
      <CheckoutBody />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default Checkout;
