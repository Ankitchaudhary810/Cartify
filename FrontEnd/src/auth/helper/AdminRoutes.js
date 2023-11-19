import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAutheticated } from "./index";

const AdminRoutes = () => {

  if(isAutheticated().user.role === 1 ){
    return <Outlet/>
  }else{
    return <Navigate to={"/signin"}/>
  }
}

export default AdminRoutes;
