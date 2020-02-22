import { combineReducers } from 'redux';

import NewYorkTimesReducer from './new-york-time/nyt-reducer';

const reducer = combineReducers({
  nytData: NewYorkTimesReducer,
});

export default reducer;
