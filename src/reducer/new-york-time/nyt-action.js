import * as TYPE from "./nyt-type";

export const FetchApiStart = (searchString, option) => {
  return {
    type: TYPE.FECTH_API_START,
    payload: {searchString, option}
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
