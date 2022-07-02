import * as constants from "./alertConstants";

export const success = () => {
  return {
    type: constants.SUCCESS,
  };
};

export const fail = () => {
    return {
      type: constants.FAILED,
    };
  };
