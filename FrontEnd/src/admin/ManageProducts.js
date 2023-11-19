import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { deleteProduct, getProducts } from './helper/adminapicall';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, Token } = isAutheticated();

  const preLoad = () => {
    getProducts().then(data => {
      if (data !== undefined) {
        if (data.msg === 'NO PRODUCT FOUND') {
          console.log(data.msg);
        } else {
          setProducts(data);
        }
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const DeleteThisProduct = productid => {
    deleteProduct(productid, user._id, Token)
      .then(data => {
        if (data.msg === 'Failed to delete the product' || data.msg === "Internal Server Error") {
          console.log(data.msg);
        } else {
          preLoad();
        }
      })
  }

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {products.length} products</h2>

          {products.map((product, index) => (
            <div key={index} className="row text-center mb-2">
              <div className="col-4">
                <h3 className="text-white text-left">{product.name}</h3>
              </div>
              <div className="col-4">
                <Link className="btn btn-success" to={`/admin/product/update/${product._id}`}>
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                  DeleteThisProduct(product._id)
                }} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
