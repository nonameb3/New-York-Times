import * as TYPE from "./nyt-type";

export const FectDataStart = () => {
  return {
    type: TYPE.FECTH_DATA_START
  };
};

export const FetchDataSuccess = data => {
  return {
    type: TYPE.FECTH_DATA_SUCCESS,
    payload: data
  };
};
