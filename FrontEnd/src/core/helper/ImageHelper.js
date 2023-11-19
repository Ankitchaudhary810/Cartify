import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({ product }) => {
  const imageUrl = product ? `${API}product/photo/${product._id}` : "https://i.stack.imgur.com/l60Hf.png";

  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        alt="photo"
        className="img-fluid custom-image"
      />
    </div>
  );
};

export default ImageHelper;
