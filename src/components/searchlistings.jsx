import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSearchInput, updateFilteredList } from "../actions";
import store from "../store";
class SearchListings extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    console.log("handling change " + e.target.value);
    const searchInput = e.target.value;
    this.props.dispatch(updateSearchInput(searchInput));
    this.handleSearch(searchInput);
  };

  handleSearch = searchInput => {
    console.log("handle searchInput: " + JSON.stringify(store.getState()));

    const filteredList = this.props.listings.filter(listing => {
      return (
        listing.itemDescription
          .toUpperCase()
          .includes(searchInput.toUpperCase()) === true &&
        listing.itemDescription
      );
    });
    console.log("filterListLength", filteredList.length);
    this.props.dispatch(updateFilteredList(filteredList));
  };

  render() {
    return (
      <div className="row ">
        <div className="col-4  ">
          <input
            className="col-sm form-control "
            type="textbox"
            name="input"
            onChange={this.handleChange}
          />

          <button
            className="col-sm btn btn-blue "
            onClick={() => this.handleSearch(this.props.searchInput)}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => ({
  filteredListings: state.filteredListings,
  listings: state.listings,
  searchInput: state.searchInput
});
export default connect(MapStateToProps)(SearchListings);
