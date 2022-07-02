import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const validate = (loginDetails) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!loginDetails.email) {
      errors.email = "Email is required";
    } else if (!regex.test(loginDetails.email)) {
      errors.email = "Enter a valid mail";
    }
    if (!loginDetails.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = validate(loginDetails);
    console.log(check);
    setLoginErrors({ ...check });
    if (Object.keys(check).length === 0) {
      axios
        .post("http://localhost:4000/api/login", {
          email: loginDetails.email,
          password: loginDetails.password,
        })
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
      setLoginDetails({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="login-wrap container w-25 mt-5">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={loginDetails.email || ""}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text text-danger">
            {loginErrors.email}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="password"
            value={loginDetails.password}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text text-danger">
            {loginErrors.password}
          </div>
        </div>
        <p className="d-flex justify-content-end small petit">
          Don't have an account?
          <Link to="/register" className="text-decoration-none petit">
            Register here
          </Link>
        </p>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
