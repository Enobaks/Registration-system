import constants from "./constants";

const userReducer = {
  getUser: (
    state = {
      loading: false,
      data: null,
      error: "",
    },
    action = {}
  ) => {
    switch (action.type) {
      case constants.GET_USER_PENDING:
        return {
          loading: true,
        };

      case constants.GET_USER_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          message: action.message,
        };

      case constants.GET_USER_FAILED:
        return {
          loading: false,
          error: action.error,
        };

      default:
        return state;
    }
  },
};

export default userReducer;
