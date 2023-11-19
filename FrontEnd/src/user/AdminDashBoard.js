import React from 'react';
import Base from '../core/Base';
import { isAutheticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {
  const { user: { name, email, role } } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link">Create Categories</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link">Manage Category </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link">Create Product</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link">Manage Products</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link">Manage Orders</Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {

    return (
      <div className="card mb-4 mt-1">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">

          <li className="list-group-item">
            <span className="badge badge-primary m-2" style={{ backgroundColor: '#007bff', color: '#fff' }}>Name:</span>{name}
          </li>

          <li className="list-group-item">
            <span className="badge badge-primary m-2" style={{ backgroundColor: '#007bff', color: '#fff' }}>Email:</span>{email}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger m-2" style={{ backgroundColor: '#dc3545', color: '#fff' }}>Admin Area</span>
          </li>


        </ul>
      </div>
    )
  };

  return (
    <Base
      title="Admin Dashboard"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-lg-3 col-md-4">
          {adminLeftSide()}
        </div>
        <div className="col-lg-9 col-md-8">
          {adminRightSide()}
        </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
