import { all, call } from 'redux-saga/effects';

import NewYorkSaga from './new-york-time/nyt-saga';

function* rootSaga() {
  yield all([call(NewYorkSaga)]);
}

export default rootSaga;
