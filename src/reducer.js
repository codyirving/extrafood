import {
  TOGGLE_INTERESTED_SECTION,
  TOGGLE_MAIN_PAGE,
  REFRESH_DATA,
  CLAIM_LISTING,
  UPDATE_SEARCH_INPUT,
  UPDATE_FILTERED_LIST,
  APPLY_CLAIMED_FILTER
} from "./actions/index";

const initialState = {
  togglePage: true,
  extraState: "anything",
  listings: [],
  filteredListings: [],
  showInterestedSection: false,
  showClaimDetails: false,
  searchInput: ""
};

export default (state = initialState, action) => {
  if (action.type === TOGGLE_MAIN_PAGE) {
    console.log("toggling");
    return Object.assign({}, state, { togglePage: !state.togglePage });
  }
  if (action.type === REFRESH_DATA) {
    console.log("Refreshing data: " + " ACtion: " + JSON.stringify(action));
    return Object.assign({}, state, {
      listings: action.newData,
      filteredListings: action.newData
    });
  }
  if (action.type === CLAIM_LISTING) {
    console.log("claimling listing reducer: ");
    return Object.assign({}, state, {
      showClaimDetails: !state.showClaimDetails
    });
  }
  if (action.type === TOGGLE_INTERESTED_SECTION) {
    return Object.assign({}, state, {
      showInterestedSection: !state.showInterestedSection
    });
  }

  if (action.type === UPDATE_SEARCH_INPUT) {
    console.log("updating search input");
    return Object.assign({}, state, {
      searchInput: action.input
    });
  }
  if (action.type === UPDATE_FILTERED_LIST) {
    console.log("updating filtered list");
    return Object.assign({}, state, {
      filteredListings: action.newFilteredList
    });
  }

  return state;
};
