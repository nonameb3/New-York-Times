import { all, put, call, takeLatest, delay } from "redux-saga/effects";
import { CANCEL } from "redux-saga";
import axios, { CancelToken } from "axios";

import { FetchApiSuccess, FetchApiFalure } from "./nyt-action";
import * as TYPE from "./nyt-type";
import { NYT_API_KEY } from "../../Config";

function fetchAPI(url) {
  const source = CancelToken.source();
  const request = axios.get(url, { cancelToken: source.token });
  request[CANCEL] = () => source.cancel();
  return request;
}

function* apiProcess({ payload }) {
  try {
    const buildURLQuery = obj => {
      return Object.entries(obj)
        .map(pair => pair.map(encodeURIComponent).join("="))
        .join("&");
    };

    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const query = {
      facet: "true",
      facet_fields: "source",
      facet_filter: "true",
      fq: `document_type:("article")`,
      q: payload.searchString,
      sort: payload.option || "newest",
      "api-key": NYT_API_KEY
    };
    url += `?${buildURLQuery(query)}`;

    const response = yield fetchAPI(url);
    const data = response.data.response.docs;
    yield put(FetchApiSuccess(data));
  } catch (error) {
    yield put(FetchApiFalure(error.message));
  }
}

// handle saga function
function* onFetchApiStart() {
  yield takeLatest(TYPE.FECTH_API_START, function*(props) {
    yield delay(1000);
    yield apiProcess(props);
  });
}

export function* NewYorkSaga() {
  yield all([call(onFetchApiStart)]);
}
