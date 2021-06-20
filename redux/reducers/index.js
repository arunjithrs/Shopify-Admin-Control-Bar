import { combineReducers } from "redux";
import { bannerReducer } from "./banner";

export default combineReducers({
  banner: bannerReducer,
});
