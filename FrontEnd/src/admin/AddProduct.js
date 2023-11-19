import React, { useEffect, useState } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './helper/adminapicall';

import { isAutheticated } from '../auth/helper';
import { API } from '../backend';

const AddProduct = () => {
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
    formData: "",
  });

  const { name, description, price, stock, photo, categories, category, loading, error, createdProduct, getaRedirect, formData } = values;

  const preLoad = () => {
    setTimeout(() => {
      getCategories().then(data => {
        console.log(data);
        if (data.msg) {
          setValues({ ...values, error: data.msg })
        } else {
          setValues({ ...values, categories: data, formData: new FormData() })
        }
      })
    }, 1500);
  }

  useEffect(() => {
    preLoad();
  }, []);

  const renderLoading = () => (
    <div className="text-center">
      <h2>Loading...</h2>
    </div>
  );


  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div className="alert alert-primary mt-3" style={{ display: createdProduct ? '' : 'none' }}>
      <h4>{createdProduct} </h4>
    </div>
  );

  const onSubmit = e => {
    e.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, Token, formData)
      .then(data => {
        if (data.error === "Please include all fields") {
          setValues({ ...values, error: data.error, createdProduct: data.error });
        } else {
          setValues({
            ...values,
            name: '',
            description: '',
            price: '',
            photo: '',
            stock: '',
            categories: [],
            loading: false,
            createdProduct: data.msg
          });
        }
      })
      .catch(error => {
        console.log(error);
        setValues({ ...values, error: 'Failed to create product', loading: false });
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
            required
          />
        </label>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange('name')}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
          required
        />
      </div>
      <div className="form-group mt-2">
        <textarea
          onChange={handleChange('description')}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
          required
        />
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange('price')}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
          required
        />
      </div>
      <div className="form-group mt-2">
        <select
          onChange={handleChange('category')}
          className="form-control"
          placeholder="Category"
          value={category}
          required
        >
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
          required
        />
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-outline-success mt-3 mb-2">
        Create Product
      </button>

      {/* Image preview */}
      {photo && (
        <div className="mt-4">
          <h5>Image Preview:</h5>
          <img src={URL.createObjectURL(photo)} className="img-fluid custom-image-preview" alt="Preview" />
        </div>
      )}
    </form>
  );

  return (
    <Base
      title="Add A Product Here!"
      description="Welcome to Product Creation section"
      className="container bg-info p-4">
      <h1 className="text-white">Add Product</h1>
      <Link to="/admin/dashboard" className="btn btn-md btn-danger mt-3">Admin Home</Link>

      <div className="row bg-dark text-white rounded mt-4">
        <div className="col-md-8 offset-md-2">

          {loading ? (
            renderLoading()
          ) : (
            <>
              {successMessage()}
              {createProductForm()}
            </>
          )}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
