import { getAccessToken } from "../utils/AuthService";
export const TOGGLE_MAIN_PAGE = "TOGGLE_MAIN_PAGE";
export const toggleMainPage = () => ({
  type: TOGGLE_MAIN_PAGE
});
export const REFRESH_DATA = "REFRESH_DATA";
export const refreshData = newData => {
  console.log("refreshData: newData: " + JSON.stringify(newData));
  return {
    type: REFRESH_DATA,
    newData
  };
};

export function refData() {
  return (dispatch, getState) => {
    console.log("getState before refData() : " + JSON.stringify(getState()));
    console.log("access toke: " + getAccessToken());
    fetch(`http://${process.env.REACT_APP_API_HOST}/foodlistings/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      mode: "cors", // no-cors, cors, *same-origin
      credentials: "same-origin"
    })
      .then(response => response.json())
      .then(data => {
        dispatch(refreshData(data));
      })
      .catch(error => {
        console.log("error: " + error);
      });
  };
}
export const APPLY_CLAIMED_FILTER = "APPLY_CLAIMED_FILTER";
export function applyClaimedFilter() {
  return (dispatch, getState) => {
    // const listings = this.state.listings;

    // const newFilteredListings =

    // console.log("first filter and map: " + newFilteredListings);
    // this.tempList = newFilteredListings;
    console.log("apply claimed: " + getState());
    let newData;
    fetch(`http://${process.env.REACT_APP_API_HOST}/foodlistings/`)
      .then(response => response.json())
      .then(data => {
        console.log("(applyclaimed)Data: ", data);
        newData = data;
        console.log("(applyClaimed)NewData: ", newData);
      })
      .then(dispatch(refreshData(newData)))
      .then(console.log("apply clamied then: " + getState()))
      .then(dispatch(updateFilteredList(getState().newData)));
  };
}

export function claimListing(id, email) {
  console.log("Email? " + email);
  return (dispatch, getState) => {
    const payload = {
      _id: id,
      claimed: "true",
      claimedDate: new Date(),
      email: email
    };

    const postData = (url = "", data = {}) => {
      // Default options are marked with *

      return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        mode: "cors", // no-cors, cors, *same-origin
        credentials: "same-origin",
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
    };

    return postData(
      `http://${process.env.REACT_APP_API_HOST}/foodlistings/claim`,
      payload
    )
      .then(data => dispatch(refData()))
      .catch(error => console.error(error));
  };
}
export function postNewListing(newListing) {
  return (dispatch, getState) => {
    const payload = {
      itemDescription: newListing.itemDescription,
      listerExtraNotes: newListing.listerExtraNotes,
      pickupLocation: newListing.pickupLocation,
      userEmail: newListing.userEmail,
      dateAvailable: newListing.dateAvailable,
      dateExpires: newListing.dateExpires,
      selfPickup: newListing.selfPickup,
      curbsidePickup: newListing.curbsidePickup,
      comeToDoor: newListing.comeToDoor,
      meetUpAtLocation: newListing.meetUpAtLocation,
      willDropOff: newListing.willDropOff
    };

    const postData = (url = "", data = {}) => {
      // Default options are marked with *

      return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => console.log(response)) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
    };

    return postData(
      `http://${process.env.REACT_APP_API_HOST}/foodlistings/`,
      payload
    )
      .then(data => dispatch(refData()))
      .catch(error => console.error(error));
  };
}

export const TOGGLE_INTERESTED_SECTION = "TOGGLE_INTERESTED_SECTION";
export const toggleInterestedSection = listing => ({
  type: TOGGLE_INTERESTED_SECTION,
  listing
});
export const UPDATE_SEARCH_INPUT = "UPDATE_SEARCH_INPUT";
export const updateSearchInput = input => ({
  type: UPDATE_SEARCH_INPUT,
  input
});
export const UPDATE_FILTERED_LIST = "UPDATE_FILTERED_LIST";
export const updateFilteredList = newFilteredList => ({
  type: UPDATE_FILTERED_LIST,
  newFilteredList
});
export const UPDATE_USER_INFO = "UPDATE_USER_INFO";
export const updateUserInfo = userInfo => ({
  type: UPDATE_USER_INFO,
  userInfo
});
