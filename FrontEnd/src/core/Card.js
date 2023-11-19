import React, { useState } from 'react';
import ImageHelper from './helper/ImageHelper';
import { useNavigate } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CardHelper';

const Card = ({
  product,
  AddToCart = true,
  removeFromCart = false,
  setReload = () => {},
  reload = undefined
}) => {
  const navigate = useNavigate();

  const addToCart = () => {
    addItemToCart(product, () => {
      navigate('/cart');
    });
  };

  const handleRemoveFromCart = () => {
    removeItemFromCart(product._id);
    setReload(!reload);
  };

  const cardTitle = product ? product.name : 'A Photo';
  const cardDescription = product ? product.description : 'Product description';
  const cardPrice = product ? product.price : 'A Price';

  const showAddToCart = () => {
    return (
      AddToCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-primary mt-2 mb-2 w-100 shadow-sm"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={handleRemoveFromCart}
          className="btn btn-block btn-outline-danger mt-2 mb-2 w-100"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info shadow">
      <div className="card-header lead text-gray-300">{cardTitle}</div>
      <div className="card-body flex justify-center">
        <ImageHelper product={product} />
        <p className="lead bg-gray-800 font-weight-normal text-wrap text-gray-300">
          {cardDescription}
        </p>
        <p className="btn btn-primary rounded btn-sm px-4">₹ {cardPrice}</p>
        <div className="row">
          <div className="col-12">
            {showAddToCart()}
          </div>
          <div className="col-12">
            {showRemoveFromCart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
