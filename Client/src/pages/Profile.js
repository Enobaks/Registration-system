import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const userDetails = useSelector((store) => store.data);
  console.log(userDetails);
  return (
    <div>
      <h5>Welcome {userDetails.firstname}</h5>
      <button className="btn btn-danger">Log out</button>
    </div>
  );
};

export default Profile;
