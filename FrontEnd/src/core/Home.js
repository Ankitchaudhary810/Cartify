import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.msg === "NO PRODUCT FOUND") {
        setError("NO PRODUCT FOUND");
      } else {
        setProducts(data);
      }
      console.log("data: ", data);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Base className="mt-1" title="Home Page" description="Welcome to the Cartify Store">
      <div className="container">
        <h1 className="text-center text-white mb-5">All Products</h1>
        <div className="row">
          {products.map((product, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}
