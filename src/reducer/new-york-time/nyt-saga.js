import { all, put, call, takeLatest, delay, select } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import axios, { CancelToken } from 'axios';

import { FetchApiSuccess, FetchApiFalure, FetchNextPageSuccess, FetchApiStart } from './nyt-action';
import * as TYPE from './nyt-type';
import { NYT_API_KEY } from '../../Config';

function fetchAPI(url) {
  const source = CancelToken.source();
  const request = axios.get(url, { cancelToken: source.token });
  request[CANCEL] = () => source.cancel();
  return request;
}

function* apiProcess(payload) {
  const buildURLQuery = obj => {
    return Object.entries(obj)
      .map(pair => pair.map(encodeURIComponent).join('='))
      .join('&');
  };

  let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  const query = {
    page: payload.page || 0,
    q: payload.searchString,
    sort: payload.option || 'newest',
    'api-key': NYT_API_KEY,
  };
  url += `?${buildURLQuery(query)}`;

  const response = yield fetchAPI(url);
  return response.data.response.docs;
}

function* onFetchData() {
  try {
    const uiState = yield select(state => state.nytData.uiState);

    const data = yield apiProcess(uiState);
    yield put(FetchApiSuccess(data));
  } catch (error) {
    yield put(FetchApiFalure(error.message));
  }
}

function* onFetchNextPage() {
  try {
    const uiState = yield select(state => state.nytData.uiState);

    if (uiState.page >= 99) {
      yield delay(2000);
      yield put(FetchNextPageSuccess([]));
      return;
    }
    const data = yield apiProcess(uiState);
    yield put(FetchNextPageSuccess(data));
  } catch (error) {
    yield put(FetchApiFalure(error.message));
  }
}

// handle saga function
function* takeOnUIStateChange() {
  yield takeLatest(TYPE.CHANGE_UI_STATE, function* handleDelay() {
    yield put(FetchApiStart());
  });
}

function* takeOnFetchApiStart() {
  yield takeLatest(TYPE.FECTH_API_START, function* handleDelay(props) {
    yield delay(1000);
    yield onFetchData(props);
  });
}

function* takeOnFetchNextPage() {
  yield takeLatest(TYPE.FETCH_API_NEXT_PAGE_START, onFetchNextPage);
}

function* NewYorkSaga() {
  yield all([call(takeOnFetchApiStart), call(takeOnFetchNextPage), call(takeOnUIStateChange)]);
}

export default NewYorkSaga;
