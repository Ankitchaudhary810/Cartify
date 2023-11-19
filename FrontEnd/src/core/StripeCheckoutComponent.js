import React from 'react';
import { Link } from 'react-router-dom';
import { API } from '../backend';
import { isAutheticated } from '../auth/helper';
import StripeCheckout from 'react-stripe-checkout';
import {cardEmpty, loadCart} from "./helper/CardHelper"

const StripeCheckoutComponent = ({ products }) => {
  const publishableKey = "pk_test_51NIY30SE2byZZ6GsqdD3kldCygm5kNb1OvC6o5PHE7ZYG4wYKFfnyXyZzFwUeyBRVPcq5wIS4qJvBVNXKHQYziab00kWUfzUqI";

  const getFinalAmount = () => {
    let amount = 0;
    products.forEach((product) => {
      amount += product.price;
    });
    return amount;
  };

  const FinalAmount =  getFinalAmount() * 100;
  const makePayment = async (token) => {
    const body = {
      token, FinalAmount
    };

    try {
      const response = await fetch(`${API}stripepayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const { status } = response;
      console.log(status);
    } catch (error) {
      console.log(error);
    }
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckout
        stripeKey={publishableKey}
        token={makePayment}
        amount={getFinalAmount() * 100}
        name={`Pay with Card`}
        currency='INR'
        shippingAddress
        billingAddress
      >
        <button
          className="btn btn-success shadow p-3 mb-5 bg-dark rounded"
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
        >
          Pay with Stripe
        </button>
      </StripeCheckout>
    ) : (
      <Link to="/signin">
        <button
          className="btn btn-danger shadow p-3 mb-5 bg-dark rounded"
          style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', color: 'white' }}
        >
          Sign In
        </button>
      </Link>
    );
  };

  return (
    <div className="card bg-dark text-white p-4 shadow">
      <h2 className="text-white">Stripe Checkout ₹{getFinalAmount()}</h2>
      {showStripeButton()
      
      }
    </div>
  );
};

export default StripeCheckoutComponent;
