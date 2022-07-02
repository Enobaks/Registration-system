import React from 'react'
import { useSelector, useDispatch } from 'react-redux';


const Profile = () => {
  const userName = useSelector((store) => store.firstname)
  return (
    <div>
      <h5>Welcome {userName}</h5>
      <button className='btn btn-danger'>Log out</button>
    </div>
  )
}

export default Profile