import * as TYPE from './nyt-type';

const INITIAL_STATE = {
  isLoading: false,
  isNextPageLoading: false,
  articles: [],
  uiState: {
    searchString: '',
    option: 'newest',
    page: 0,
  },
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPE.FECTH_API_START:
      return {
        ...state,
        isLoading: true,
        isLoadingNextPage: false,
        articles: [],
      };
    case TYPE.FECTH_API_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        isLoading: false,
      };
    case TYPE.FECTH_API_FAILURE:
      return {
        ...state,
        articles: [],
        isLoading: false,
        isNextPageLoading: false,
      };
    case TYPE.FETCH_API_NEXT_PAGE_START: {
      return {
        ...state,
        uiState: { ...action.payload, page: action.payload.page + 1 },
        isNextPageLoading: true,
      };
    }
    case TYPE.FETCH_API_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        articles: [...state.articles, ...action.payload],
        isNextPageLoading: false,
      };
    case TYPE.CHANGE_UI_STATE:
      return {
        ...state,
        uiState: { ...action.payload, page: 0 },
      };
    default:
      return state;
  }
}
