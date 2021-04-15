import React, { useEffect, useState } from "react";
import "../../App.css";
import Newsletter from "../../components/Layout/Newsletter/Newsletter";
import Footer from "../../components/Layout/Footer/Footer";
import BannerV2 from "../../components/Banner/BannerV2";
import Header from "../../components/Layout/Header/Header";
import ShopMain from "../../components/Shop/ShopMain";
import bg from "../../assets/b1.jpg";
import { withRouter } from "react-router-dom";
import { getProducts } from "../../services/products";

function Shop(props) {
  const [products, setProducts] = useState([]);
  const [sortedCate, setSortedCate] = useState([]);
  let type = props.location.pathname.split("/")[1];
  let cate = props.location.pathname.split("/")[2];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  useEffect(() => {
    if (type === "shop") {
      getProducts().then((res) => {
        const virtualCate = [...res.data];
        console.log(res.data);
        //Get all category
        const sortedcate = Object.values(
          virtualCate.reduce((a, { productCate }) => {
            a[productCate] = a[productCate] || { productCate, count: 0 };
            a[productCate].count++;
            return a;
          }, Object.create(null)),
        );

        //Sort and splice category by posts count
        sortedcate.sort((a, b) => b.count - a.count);
        setSortedCate(sortedcate);
        const virtualData = [];
        for (let i in res.data) {
          if (cate) {
            if (
              res.data[i].productName.toLowerCase().includes(cate.toLowerCase())
            ) {
              virtualData.push(res.data[i]);
            }
          } else {
            virtualData.push(res.data[i]);
          }
        }
        setProducts(virtualData);
      });
    } else {
      type.toLowerCase() === "phone" ? (type = "phone") : (type = "laptop");
      getProducts().then((res) => {
        const virtualCate = [];
        for (let i in res.data) {
          if (type === "laptop") {
            if (res.data[i].productType === "Laptop") {
              virtualCate.push(res.data[i]);
            }
          } else {
            if (res.data[i].productType === "Phone") {
              virtualCate.push(res.data[i]);
            }
          }
        }
        //Get all category
        const sortedcate = Object.values(
          virtualCate.reduce((a, { productCate }) => {
            a[productCate] = a[productCate] || { productCate, count: 0 };
            a[productCate].count++;
            return a;
          }, Object.create(null)),
        );
        //Sort and splice category by posts count
        sortedcate.sort((a, b) => b.count - a.count);
        setSortedCate(sortedcate);

        const virtualData = [];
        for (let i in res.data) {
          if (!cate) {
            if (
              res.data[i].productType &&
              res.data[i].productType.toLowerCase() === type
            ) {
              virtualData.push(res.data[i]);
            }
          } else {
            if (
              res.data[i].productType &&
              res.data[i].productType.toLowerCase() === type &&
              cate &&
              res.data[i].productGroupCate
                .toLowerCase()
                .split(" ")
                .join("-") === cate
            ) {
              virtualData.push(res.data[i]);
            } else if (
              res.data[i].productType &&
              res.data[i].productType.toLowerCase() === type &&
              cate &&
              res.data[i].productCate.toLowerCase().split(" ").join("-") ===
                cate
            ) {
              virtualData.push(res.data[i]);
            }
          }
        }
        setProducts(virtualData);
      });
    }
  }, [type, cate]);

  return (
    <div className="Men">
      <Header />
      <BannerV2 bannerImage={bg} />
      <ShopMain products={products} sortedCate={sortedCate} />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default withRouter(Shop);
