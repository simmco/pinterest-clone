import { FETCH_PICTURES, FETCH_USER, LIKE_PIC } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PICTURES:
      return  state = action.payload;
    case FETCH_USER:
      return state = action.payload;
    case LIKE_PIC:
      return state.map((pic) => {
        if(pic._id === action.payload._id) {
          return action.payload
        }
        return pic;
      });
    default:
      return state;
  }
}
