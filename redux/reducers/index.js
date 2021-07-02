import { combineReducers } from "redux";
import { toolbarReducer } from "./toolbar";
import { themeReducer } from "./theme";

export default combineReducers({
  toolbar: toolbarReducer,
  theme: themeReducer,
});
