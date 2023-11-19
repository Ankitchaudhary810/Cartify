import React, { useEffect, useState } from 'react';
import { loadCart, cardEmpty } from './helper/CardHelper';
import { getMeToken, proccessPayment } from './helper/paypalHelper';
import { Link } from 'react-router-dom';
import { createOrder } from './helper/OrderHelper';
import { isAutheticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';
import { API } from '../backend';

const Paypal = ({ products, setReload = () => {}, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
  });

  const userId = isAutheticated() && isAutheticated().user._id;
  const Token = isAutheticated() && isAutheticated().Token;

  const getToken = async (userId, Token) => {
    try {
      getMeToken(userId, Token).then((info) => {
        if (info.error) {
          setInfo({ ...info, error: info.error });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken != null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => {
                setInfo({ ...info, instance });
              }}
            />
            <button className="btn btn-outline-primary" onClick={onPurchase}>
              Continue
            </button>
          </div>
        ) : (
          <h3 className="text-white">PLEASE LOGIN OR ADD SOMETHING TO THE CART</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, Token);
  }, []);

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    info.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        console.log('Payment Data:', paymentData);
        proccessPayment(userId, Token, paymentData)
          .then((response) => {
            console.log('Success:', response.success);
            setInfo({ ...info, success: response.success, loading: false });
            //Todo:
          })
          .catch((err) => {
            console.log('Error:', err);
            setInfo({ ...info, loading: false, success: false });
          });
      })
      .catch((error) => {
        console.log('Request Payment Method Error:', error);
      });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount += amount + p.price;
    });
    return amount;
  };

  return (
    <>
      <div>
        <h3 className="text-white">Paypal Checkout ${parseInt(getAmount()/81)}</h3>
        {showDropIn()}
      </div>
    </>
  );
};

export default Paypal;
