import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import {signin,authenticate,isAutheticated} from "../auth/helper/index"
const Signin = () => {

 
  const [email, setEmail] = useState("");
  const [encry_password, setencry_password] = useState("");
  const [error, seterror] = useState("");
  const [loading, setLoding] = useState(false);
  const [didRedirect, setdidRedirect] = useState(false);

  const {user} = isAutheticated();

  

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard"/>;
      } else {
        return <Navigate to="/user/dashboard"/>;
      }
    }
    if (isAutheticated()) {
      return <redirect to="/" />;
    }
  };

  // const LoadingMessage = () => {
  //   return (
  //     loading && (
  //       <div className="alert alert-info">
  //         <h3>Loading...</h3>
  //       </div>
  //     )
  //   )
  // }
  const ErrorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">

          <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
          </div>
        </div>
      </div>
    )
  }

  const signInForm = () => {
    const onSubmit = async (event) => {
      event.preventDefault();
      try {
        const data = await signin({ email, encry_password });
        if (data.msg.num === 11) {
          console.log("Valid user");
        } else if (data.msg === "Password is incorrect") {
          seterror("Password is incorrect");
          setdidRedirect(false);
        } else if (data.msg === "User is not found") {
          seterror("User not found. Please check your email.");
        } else {
          authenticate(data, () => {
            setdidRedirect(true);
          });
        }
      } catch (error) {
        console.log("Signin request fails", error);
      }
    };
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={encry_password}
                onChange={(e) => setencry_password(e.target.value)}
              />
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {/* {LoadingMessage()} */}
      {ErrorMessage()}
      {signInForm()}
      {/* {performRedirect()} */}
      <p className="text-white text-center">{`Email: ${email}, Password: ${encry_password} Error:${error}  redirected:${didRedirect}`}</p>
      {didRedirect && <Navigate to="/" />}

    </Base>
  );
};

export default Signin;
