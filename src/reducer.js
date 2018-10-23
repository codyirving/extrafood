import {
  TOGGLE_INTERESTED_SECTION,
  TOGGLE_MAIN_PAGE,
  REFRESH_DATA,
  UPDATE_SEARCH_INPUT,
  UPDATE_FILTERED_LIST,
  UPDATE_USER_INFO
} from "./actions/index";

const initialState = {
  togglePage: true,
  extraState: "anything",
  listings: [],
  filteredListings: [],
  showInterestedSection: false,
  showClaimDetails: false,
  searchInput: "",
  userInfo: {}
};

export default (state = initialState, action) => {
  if (action.type === TOGGLE_MAIN_PAGE) {
    //console.log("toggling");
    return Object.assign({}, state, { togglePage: !state.togglePage });
  }
  if (action.type === REFRESH_DATA) {
    return Object.assign({}, state, {
      listings: action.newData,
      filteredListings: action.newData
    });
  }

  if (action.type === TOGGLE_INTERESTED_SECTION) {
    return Object.assign({}, state, {
      listing: { showInterestedSection: !action.listing.showInterestedSection }
    });
  }

  if (action.type === UPDATE_SEARCH_INPUT) {
    return Object.assign({}, state, {
      searchInput: action.input
    });
  }
  if (action.type === UPDATE_FILTERED_LIST) {
    return Object.assign({}, state, {
      filteredListings: action.newFilteredList
    });
  }
  if (action.type === UPDATE_USER_INFO) {
    return Object.assign({}, state, {
      userInfo: action.userInfo
    });
  }
  return state;
};
