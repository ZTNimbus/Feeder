import { FETCH_SURVEYS } from "../actions/types";

function reducer(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;

    default:
      return state;
  }
}
export { reducer };
