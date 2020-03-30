import {EDIT_TOMATO,ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO} from '../actionTypes';

export default (state: any[] = [], action) => {
  switch (action.type) {
    case ADD_TOMATO:
      return [action.payload, ...state];
    case INIT_TOMATOES:
      return [...action.payload];
    case EDIT_TOMATO:
      return state.map(t => {
        if (t.id === action.payload) {
          return Object.assign({}, t, {editing: true});
        } else {
          return Object.assign({}, t, {editing: false});
        }
      });
    case UPDATE_TOMATO:
      return state.map(t => {
        if (t.id === action.payload.id) {
          return action.payload;
        } else {
          return t;
        }
      });
    default:
      return state;
  }
}