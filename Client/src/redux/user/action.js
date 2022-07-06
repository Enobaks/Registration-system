import constants from "./constants";
import axios from "axios";

const UserDispatch = {
  getUser: (payload={}) => async (dispatch) => {
    dispatch({
      type: constants.GET_USER_PENDING,
    });
    axios
      .get("http://localhost:4000/api/login", payload)
      .then((res) => {
        dispatch({
          type: constants.GET_USER_SUCCESS,
          payload: res.data.user,
          message: res.data.message,
        });
      })
      .catch((err) => {
        dispatch({
          type: constants.GET_USER_FAILED,
          payload: null,
          error: err.message,
        });
      });
  },
};

// export const getUserDetails = (payload = {}) => {
//   return (dispatch) => {
//     dispatch(loginRequest);
//     const params = {
//       email: payload.email,
//       password: payload.password,
//     };

//     axios
//       .post("http://localhost:4000/api/login", params)
//       .then((res) => {
//         const userDetails = res.data;
//         console.log(res);
//         dispatch(loginRequestSuccess(userDetails.user));
//       })
//       .catch((err) => {
//         const errorMsg = err.message;
//         dispatch(loginRequestFailure(errorMsg));
//       });
//   };
// };

export default UserDispatch;
