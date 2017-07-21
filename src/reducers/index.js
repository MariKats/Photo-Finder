import { combineReducers } from "redux";
import PhotoListReducer from "./reducer_photolist";

const rootReducer = combineReducers({
  photolist: PhotoListReducer
});

export default rootReducer;
