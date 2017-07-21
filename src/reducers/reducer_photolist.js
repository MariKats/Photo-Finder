import { FETCH_PHOTOLIST } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PHOTOLIST:
      return [action.payload.data, ...state];
    default: return state;
  }
}
