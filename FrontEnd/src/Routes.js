import React from "react";
import { BrowserRouter as Router, Routes as R, Route } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import AdminRoutes from "./auth/helper/AdminRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
const Routes = () => {
  return (
    <Router>
      <R>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/user" element={<PrivateRoutes/>}>
          <Route path="dashboard" element={<UserDashBoard/>}></Route>
        </Route>

        
        <Route path="/admin" element={<AdminRoutes/>}>
          <Route path="create/category" element={<AddCategory/>}></Route>
          <Route path="create/product" element={<AddProduct/>}></Route>
          <Route path="dashboard" element={<AdminDashBoard/>}></Route>
          <Route path="categories" element={<ManageCategories/>}></Route>
          <Route path="products" element={<ManageProducts/>}></Route>
          <Route path="product/update/:productId" element={<UpdateProduct/>}></Route>
          <Route path="category/update/:categoryId" element={<UpdateCategory/>}></Route>
        </Route>


       
      </R>
    </Router>
  );
};

export default Routes;
