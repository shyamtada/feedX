import { put, takeEvery } from "redux-saga/effects";
import {FeedData} from "../Components/feedData";

function* getData() {
  const json = yield FeedData ;

  yield put({ type: "RECEIVED_DATA", json: json.Posts });
}

export default function* rootSaga() {
  yield takeEvery("GET_DATA", getData);
}
