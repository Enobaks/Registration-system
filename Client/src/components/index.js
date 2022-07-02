import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className=" d-flex justify-content-around align-items-center pt-5">
      <h2>Home Page</h2>
      <div className="btn-wrap d-flex">
        <Link to="/register">
          <button className="btn btn-primary me-2">Register</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-outline-primary">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default index;
