import { all, put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { FetchApiSuccess, FetchApiFalure } from './nyt-action';
import * as TYPE from './nyt-type';

export function* apiProcess() {
  try {
    const apiKey= process.env.REACT_APP_APIKEY;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${apiKey}&sort=newest`
    const response = yield axios.get(url);
    const data = response.data.response.docs;
    yield put(FetchApiSuccess(data));
  } catch (error) {
    yield put(FetchApiFalure(error.message));
  }
}

// handle function
export function* onFetchApiStart() {
  yield takeLatest(TYPE.FECTH_API_START, apiProcess)
}

export function* NewYorkSaga() {
  yield all([call(onFetchApiStart)])
}