import React from "react";
import {  Navigate, Outlet } from "react-router-dom";
import { isAutheticated } from "./index";

const PrivateRoutes = () => {
    if(isAutheticated()){
      return <Outlet/>
    }else{
      return <Navigate to={"/signin"}/>
    }
}


export default PrivateRoutes;
