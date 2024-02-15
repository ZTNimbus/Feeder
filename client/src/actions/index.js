import axios from "axios";

import store from "../main";
import { FETCH_USER } from "./types";

async function dispatchFetchUser() {
  const res = await axios.get("/api/current");

  store.dispatch({ type: FETCH_USER, payload: res.data });
}

async function dispatchHandleToken(token) {
  const res = await axios.post("/api/stripe", token);

  store.dispatch({ type: FETCH_USER, payload: res.data });
}

export { dispatchFetchUser, dispatchHandleToken };
