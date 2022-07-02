import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import userReducer from "../redux/user/userReducer";
import { register } from "../redux/user/UserAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "", 
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const registeredUser = useSelector((store) => store.isRegistered);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Check = validate(formValues);

    setFormErrors({ ...Check });

    if (Object.keys(Check).length === 0) {
      console.log(formErrors);
      axios
        .post("http://localhost:4000/api/register", { 
        firstname: formValues.firstname,
        lastname: formValues.lastname,
        email: formValues.email,
        password: formValues.password,})
        .then((res) => {
          if (res) toast.success(res.data.message);
        })
        .catch((err) => {
          if (err) toast.error(err.response.data);
        });
      // dispatch(register(formValues));
      setTimeout(() => navigate("/login"), 5000);
    }
    console.log("Errors", formErrors);
    console.log("Values", formValues);
    setFormValues({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // const notify = () => {
  //   console.log("idfgd", registeredUser);
  //   registeredUser
  //     ? toast.success("Registration Successful!")
  //     : toast.error("Registration Failed!");
  // };
  // useEffect(() => {
  //   console.log(registeredUser);
  //   registeredUser && toast.success("Registration Successful!");
  // }, [registeredUser]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.fullname = "Firstname is required!";
    } else if (values.firstname.length < 3)
      errors.fullname = "Invalid Firstname";
    if (!values.lastname) {
      errors.fullname = "Lastname is required!";
    } else if (values.lastname.length < 3) errors.fullname = "Invalid Lastname";
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmPassword)
      errors.confirmPassword = "Confirm Password is required";
    else if (values.confirmPassword !== values.password)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up Form</h1>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="firstname"
            placeholder="Enter your first name"
            value={formValues.firstname || ""}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text text-danger">
            {formErrors.firstname}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="lastname"
            placeholder="Enter your last name"
            value={formValues.lastname || ""}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text text-danger">
            {formErrors.lastname}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your email address"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text text-danger">
            {formErrors.email}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={formValues.password || ""}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text text-danger">
            {formErrors.password}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formValues.confirmPassword || ""}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text text-danger">
            {formErrors.confirmPassword}
          </div>
        </div>
        <p className="d-flex justify-content-end small">
          Have an account
          <Link to="/login" className="text-decoration-none ms-1">
            login
          </Link>
        </p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
