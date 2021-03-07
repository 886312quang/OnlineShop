import React, { useContext, useEffect, useRef, useState } from "react";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCartPlus,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";

export default function ProductMain(props) {
  const [imgIndex, setImgIndex] = useState(0);
  const [countCart, setCountCart] = useState(1);
  const [hover, setHover] = useState(false);
  const [zoom, setZoom] = useState(`0% 0%`);
  const [loading, setLoading] = useState(0);

  const sliderWidth = useRef(null);
  const productSmall = useRef(null);

  const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str; // Trim - from end of text
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoom(`${x}% ${y}%`);
  };

  let slugSex = "";
  let ratingList = "";
  let product = "";
  let ratingStar = {};

  if (props.product) {
    product = props.product;
    slugSex = "/" + slugify(product.productSex === "Woman" ? "Women" : "Men");

    if (imgIndex >= product.productImg.length) {
      setImgIndex(0);
    }

    //Counting star vote
    ratingList = product.productVote.map((a) => a.ratingStar); // get all rating
    const totalRating = ratingList.reduce((a, b) => a + b, 0);

    const averageRating = totalRating / ratingList.length;
    ratingStar = {
      size: 12,
      value: averageRating,
      edit: false,
      activeColor: "#fda32a",
      color: "#ddd",
      isHalf: true,
    };
  }
  let productDate = new Date(product.productDate);
  let today = new Date();

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <div className="ProductBody">
      <div className="product-breadcrumb flex">
        <Link to="/" className="breadcrumb-item breadcrumb-link">
          Home
        </Link>
        <FontAwesomeIcon icon={faAngleRight} className="breadcrumb-arrow" />
        <Link to={slugSex} className="breadcrumb-item breadcrumb-link">
          {product.productSex === "Woman" ? "Women" : "Men"}
        </Link>
        <FontAwesomeIcon icon={faAngleRight} className="breadcrumb-arrow" />
        <div className="breadcrumb-item breadcrumb-product">
          {product.productName}
        </div>
      </div>

      <div className="product-detail flex">
        <div
          className="product-gallery flex"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <div className="product-small" ref={productSmall}>
            {product.productImg &&
              product.productImg.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      imgIndex === index
                        ? "product-small-item product-small-item-active"
                        : "product-small-item"
                    }
                  >
                    <img
                      src={item}
                      onClick={() => {
                        setImgIndex(index);
                      }}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
          <div
            className="product-slider flex"
            onMouseMove={handleMouseMove}
            ref={sliderWidth}
          >
            <div className="product-tag">
              {product.productSale > 0 && (
                <div className="product-tag-item sale">
                  {product.productSale}%
                </div>
              )}
              {product.productSold >= 40 && (
                <div className="product-tag-item hot">HOT</div>
              )}
              {(today - productDate) / (1000 * 3600 * 24) < 10 && (
                <div className="product-tag-item new">NEW</div>
              )}
            </div>
            {product.productImg &&
              product.productImg.map((item, index) => {
                const width = sliderWidth.current.offsetWidth;
                return (
                  <div
                    key={index}
                    className="product-big flex"
                    style={{
                      transform: `translateX(-${width * imgIndex}px`,
                      backgroundImage: `url(${item})`,
                      backgroundPosition: `${zoom}`,
                    }}
                  >
                    <div className="product-big-item">
                      <img
                        id={index}
                        className="nodrag"
                        style={{ width: `${width}px` }}
                        src={item}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
            <div
              className="change-product left"
              onClick={() => {
                if (imgIndex > 0) setImgIndex(imgIndex - 1);
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </div>
            <div
              className="change-product right"
              onClick={() => {
                if (
                  imgIndex < product.productImg.length &&
                  product.productImg.length
                )
                  setImgIndex(imgIndex + 1);
              }}
            >
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className="product-info-detail">
          <div className="product-info-title">{product.productName}</div>
          <div className="product-info-des">{product.productDes}</div>
          <div className="product-info-vote" onClick={props.scrollOnLick}>
            <div style={{ height: "40px" }}>
              {Object.keys(ratingStar).length !== 0 && (
                <ReactStars {...ratingStar} />
              )}
            </div>
            <p>({ratingList.length} customer reviews)</p>
          </div>

          {product.productFinalPrice &&
            product.productFinalPrice < product.productPrice && (
              <div className="product-info-price">
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#777",
                    marginRight: "10px",
                    fontSize: "10px",
                  }}
                >
                  {product.productPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  Đ
                </span>
                <span style={{ height: "max-content" }}>
                  {product.productFinalPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  Đ
                </span>
              </div>
            )}
          {product.productFinalPrice &&
            product.productFinalPrice === product.productPrice && (
              <div className="product-info-price">
                {product.productPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                Đ
              </div>
            )}
          <div className="product-info-cart flex">
            <div className="count-cart noselect">
              <div
                className="count-cart-item left flex-center"
                onClick={() => {
                  if (countCart > 1) setCountCart(countCart - 1);
                }}
              >
                <FontAwesomeIcon icon={faMinus} />
              </div>
              <div className="count-cart-item text flex-center">
                <form>
                  <input
                    type="text"
                    value={countCart}
                    onChange={(e) => {
                      setCountCart(Number(e.target.value.replace(/\D+/g, "")));
                    }}
                  />
                </form>
              </div>
              <div
                className="count-cart-item right flex-center"
                onClick={() => {
                  setCountCart(countCart + 1);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
            {loading === 1 && (
              <div className="product-info-addtocart flex-center btn">
                <div className="loading-icon"></div>
              </div>
            )}
            {loading !== 1 && (
              <div className="product-info-addtocart flex-center btn">
                <FontAwesomeIcon icon={faCartPlus} />
                <p>Add to cart</p>
              </div>
            )}
            {loading === 2 && (
              <div className="product-info-wishlist flex-center">
                <div className="loading-icon"></div>
              </div>
            )}
            {loading !== 2 && (
              <div className="product-info-wishlist flex-center">
                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
              </div>
            )}
          </div>
          <div className="product-info-line"></div>
          <div className="product-info-cate flex">
            <p>Category:</p>
            <p>{product.productCate}</p>
          </div>
          <div className="product-info-line"></div>
        </div>
      </div>
      <div className="product-info-line mobile-disable-line"></div>
    </div>
  );
}
