import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Routes from "../Routes";
import { API } from "../backend";
// API = https://localhost:8000/api/

const Signup = () => {


  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [encry_password, setEncry_password] = useState('')
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    signup({ name, lastname, email, encry_password })
      .then(data => {
        if (data.msg === "User is already in the database") {
          setError("user already Exits");
          setSuccess(false);
        } else {
          setSuccess(true);
        }
      })
  };

  const signUpForm = () => {
    const isAnyFieldEmpty = name.trim() === '' || lastname.trim() === '' || email.trim() === '' || encry_password.trim() === '';
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={(e) => setName(e.target.value)}

                type="text"
                value={name}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-light">LastName</label>
              <input
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                value={lastname}

              />
            </div>

            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={(e) => setEncry_password(e.target.value)}

                className="form-control"
                type="password"
                value={encry_password}
                required
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block mt-3"
              disabled={isAnyFieldEmpty}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    if (success) {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-success">
              New Account was created.. please <Link to="/signin">Login here</Link>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  const ErrorMessage = () => {
    if (error) {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger">
              {error}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {ErrorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(name, email, encry_password)}</p>
    </Base>
  );
};

export default Signup;
