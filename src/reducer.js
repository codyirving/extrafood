import { TOGGLE_MAIN_PAGE } from "./actions/index";

const initialState = {
  togglePage: true,
  extraState: "anything"
};

export default (state = initialState, action) => {
  if (action.type === TOGGLE_MAIN_PAGE) {
    return Object.assign({}, state, { togglePage: !state.togglePage });
  } else {
    return state;
  }
};
