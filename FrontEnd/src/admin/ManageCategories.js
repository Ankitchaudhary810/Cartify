import React, { useEffect, useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import { deleteCategory, getCategories } from './helper/adminapicall'

const ManageCategories = () => {

  const [categories, setCategories] = useState([]);
  const { user, Token } = isAutheticated();

  const preLoad = () => {
    getCategories().then(data => {
      if (data !== undefined) {
        if (data.msg === 'No categories found' || data.msg === "Error" ) {
          console.log(data.msg);
        } else {
          setCategories(data);
        }
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);


  const DeleteThisCategory = categoryId => {
    deleteCategory(categoryId, user._id, Token)
    .then(data => {
      if(data.msg === "Failed to remove Category" || data.msg === "Error"){
        console.log(data.msg);
      }else{
        preLoad();
      }
    })
  }


  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {categories.length} Categories</h2>
          
          {
            categories.map((category, index) => (
              <div className="row text-center mb-2 " key={index}>
              <div className="col-4">
                <h3 className="text-white text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                  DeleteThisCategory(category._id)
                }} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>  
            ))
          }
         

        </div>
      </div>
    </Base>
  )
}

export default ManageCategories;