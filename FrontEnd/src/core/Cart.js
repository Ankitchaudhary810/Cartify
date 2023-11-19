import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CardHelper";
import { API } from "../backend";
import StripeCheckoutComponent from "./StripeCheckoutComponent";
import Paypal from "./Paypal";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState("stripe");

  useEffect(() => {
    fetchProductDetails();
  }, [reload]);

  const fetchProductDetails = async () => {
    try {
      const cartItems = loadCart();
      const productPromises = cartItems.map(async (productId) => {
        const response = await fetch(`${API}productdetails/${productId}`);
        const data = await response.json();
        return data;
      });
      const productDetails = await Promise.all(productPromises);
      setProducts(productDetails);
    } catch (error) {
      console.log('Error fetching product details:', error);
    }
  };

  const loadAllProducts = (products) => {
    return (
      <div className="row">
        {products.map((product, index) => (
          <div className="col-lg-6 col-md-6 mb-4" key={index}>
            <Card
              product={product}
              removeFromCart={true}
              AddToCart={false}
              className="custom-card"
              setReload={setReload}
              reload={reload}
            />
          </div>
        ))}
      </div>
    );
  };

  const handleGatewayChange = (event) => {
    setSelectedGateway(event.target.value);
  };

  return (
    <Base className="mt-1" title="Cart Page" description="Ready to Check-Out">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8">
            {products.length > 0 ? (
              loadAllProducts(products)
            ) : (
              <h3 className="text-center text-white font-bold" style={{ minHeight: '800px' }}>
                No Product In Cart
              </h3>

            )}
          </div>
          <div className="col-lg-4 col-md-4">
            {products.length > 0 && (
              <>
                <h2 className="text-center mb-4 text-white">Checkout</h2>
                <div className="form-group">
                  <label htmlFor="gateway" className="text-white">Payment Gateway:</label>
                  <select
                    className="form-select"
                    aria-label="size 3 select example"
                    id="gateway"
                    value={selectedGateway}
                    onChange={handleGatewayChange}
                  >
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
                {selectedGateway === "stripe" ? (
                  <StripeCheckoutComponent products={products} />
                ) : (
                  <Paypal products={products} setReload={setReload} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
