import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import { reducer as authReducer } from "./authReducer";
import { reducer as surveysReducer } from "./surveysReducer";

const reducers = combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer,
});

export default reducers;
