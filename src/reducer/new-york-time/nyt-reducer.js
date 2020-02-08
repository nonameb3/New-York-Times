import * as TYPE from "./nyt-type";

const INITIAL_STATE = {
  data: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPE.FECTH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
}