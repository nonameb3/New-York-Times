import * as TYPE from "./nyt-type";

const INITIAL_STATE = {
  isLoading: false,
  articles: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPE.FECTH_API_START:
      return {
        ...state,
        isLoading: true
      }
    case TYPE.FECTH_API_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        isLoading: false
      };
    case TYPE.FECTH_API_FAILURE:
      return {
        ...state,
        articles: [],
        isLoading: false
      };
    default:
      return state;
  }
}
