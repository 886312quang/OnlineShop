import React, { useState } from "react";
import "../../App.css";
import Product from "../Product/Product";

export default function HomeTabItem(props) {
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const products = props.products;
  const height = props.height;

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLimit(limit + 5);
    }, 1500);
  };

  let width,
    heightMain,
    parentHeight,
    marginLeft,
    marginRight = "";

  width = "20%"; // five;
  parentHeight = "21vw";
  heightMain = `calc(${parentHeight} - 68px)`;

  //Limit products
  const limitProducts = products.slice(0, limit);

  return (
    <div>
      <div className="BestSeller" style={{ minHeight: `${height}px` }}>
        {limitProducts.map(function (item, index) {
          return (
            <Product
              key={index}
              product={item}
              index={index}
              width={width}
              height={heightMain}
              parentHeight={parentHeight}
            />
          );
        })}
        {limitProducts.length === 0 && (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              textTransform: "capitalize",
              marginTop: "150px",
            }}
          >
            there's nothing here yet
          </div>
        )}
      </div>
      {products.length > 10 && products.length >= limit && (
        <div className="tab-loadmore flex-center">
          <div className="tab-loadmore-btn btn" onClick={handleClick}>
            Load More
          </div>
          {loading === true && (
            <div className="tab-loadmore-btn tab-loadmore-loading btn-nothover">
              <div className="loading-icon"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
