import React, { useState } from 'react';
import Base from '../core/Base';
import { isAutheticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, Token } = isAutheticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError('');
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    // Backend request API
    createCategory(user._id, Token, { name })
      .then((data) => {
        if (data.err) {
          setError(true);
          if (data.err.code === 11000) {
            setError('Category already exists');
          } else {
            setError('Failed to create category');
          }
        } else {
          setError('');
          setName('');
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to create category');
      });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category Created Successfully</h4>;
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger">{error}</h4>;
    }
  };

  const categoryForm = () => (
    <form action="">
      <div className="form-group">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="Ex. Computer"
          onChange={handleChange}
          value={name}
        />

        <button className="btn btn-outline-info mb-1" onClick={onSubmit}>
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base title="Create a Category here" description="Add a new category for new Product" className="container bg-info p-4">
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
