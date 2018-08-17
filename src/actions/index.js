import React from "react";
import Listing from "../components/listing";
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
    //let newData = [];
    console.log("getState before refData() : " + JSON.stringify(getState()));
    let newData;
    let response = [];
    fetch("http://localhost:3001/foodlistings/")
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        dispatch(refreshData(data));
      })
      .then(
        console.log("getState after refData() : " + JSON.stringify(getState()))
      );
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
    fetch("http://localhost:3001/foodlistings/")
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

export const CLAIM_LISTING = "CLAIM_LISTING";
export const claimListing = () => ({
  type: CLAIM_LISTING
});
export const TOGGLE_INTERESTED_SECTION = "TOGGLE_INTERESTED_SECTION";
export const toggleInterestedSection = () => ({
  type: TOGGLE_INTERESTED_SECTION
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
