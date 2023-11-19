import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { Link, useParams } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './helper/adminapicall';
import { isAutheticated } from '../auth/helper';

const UpdateProduct = () => {
  const { productId } = useParams();
  const { user, Token } = isAutheticated();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    photo: '',
    categories: [],
    category: '',
    loading: false,
    error: '',
    createdProduct: '',
    getaRedirect: false,
    formData: new FormData(),
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preLoad = (productId) => {
    getProduct(productId)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category._id,
            stock: data.stock,
          });
          preLoadCategories();
        }
      })
      .catch((error) => console.log(error));
  };

  const preLoadCategories = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ categories: data, formData: new FormData() });
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    preLoad(productId);
  }, [productId]);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: '', loading: true });

    updateProduct(productId, user._id, Token, formData)
      .then((data) => {
        if (data.msg === "updation tshirt in DB failed" || data.msg === "File size too big!" || data.msg === "problem with image") {
          setValues({ ...values, error: data.msg });
        } else {
          setValues({
            ...values,
            name: '',
            description: '',
            price: '',
            stock: '',
            photo: '',
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setValues({ ...values, error: 'Failed to update product', loading: false });
      });
  };

  const createProductForm = () => (
    <form encType="multipart/form-data">
      <span>Post photo</span>
      <div className="form-group mt-2">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange('photo')}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange('name')}
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mt-2">
        <textarea
          onChange={handleChange('description')}
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange('price')}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mt-2">
        <select onChange={handleChange('category')} className="form-control" value={category}>
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange('stock')}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-outline-success mt-3 mb-2">
        Update Product
      </button>
    </form>
  );

  return (
    <Base title="Update Product" description="Edit product details">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {loading && <div className="text-center">Loading...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {createdProduct && (
            <div className="alert alert-success">{`${createdProduct} updated successfully!`}</div>
          )}
          {createProductForm()}
          <Link to="/admin/dashboard" className="btn btn-md btn-danger mt-3">
            Admin Home
          </Link>
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
