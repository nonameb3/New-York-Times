import * as TYPE from "./nyt-type";

export const FectApiStart = () => {
  return {
    type: TYPE.FECTH_API_START
  };
};

export const FetchApiSuccess = data => {
  return {
    type: TYPE.FECTH_API_SUCCESS,
    payload: data
  };
};

export const FetchApiFalure = message => {
  return {
    type: TYPE.FECTH_API_FAILURE,
    payload: message
  }
}
