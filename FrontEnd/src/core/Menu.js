import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAutheticated, signout } from "../auth/helper";


const Menu = () => {
  const location = useLocation();
  const history = useNavigate();
  const { user } = isAutheticated();


  const currentTab = (path) => {
    return {
      color: location.pathname === path ? "#2ecc72" : "#FFFFFF",
    };
  };

  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab("/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        
        <li className="nav-item">
          <Link
            style={currentTab("/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>

        
        {
          isAutheticated() && isAutheticated().user.role === 1 && (
            <li className="nav-item">
          <Link
            style={currentTab("/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </li>
          )
        }

        {isAutheticated() && isAutheticated().user.role === 0 && (
          <li className="nav-item">
          <Link
            style={currentTab("/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            U. Dashboard
          </Link>
        </li>
        )}

        {
          !isAutheticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currentTab("/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab("/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
            </Fragment>
          )
        }

        {isAutheticated() && (
          <li className="nav-item">
            <span className="nav-link text-warning"

              onClick={() => {
                signout(() => {
                  history('/');
                })
              }}

            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
