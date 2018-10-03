import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSearchInput, updateFilteredList, refData } from "../actions";
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

    // this.setState({ searchInput: e.target.value }, () =>
    //   this.props.onClick(this.state.input)
    // );
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

  // handleSearch = input => {
  //   console.log("handling Search: " + input);
  //   const filteredList = this.state.listings.filter(listing => {
  //     return (
  //       listing.itemDescription.includes(input) === true &&
  //       listing.itemDescription
  //     );
  //   });
  //   this.setState({ filteredListings: filteredList });
  // };
  componentDidMount() {
    console.log("searchlistings did mount");
    //this.props.dispatch(refData());
  }
  render() {
    return (
      <div className="col-4">
        <input
          className="search-box"
          type="textbox"
          name="input"
          onChange={this.handleChange}
        />
        <button
          className="search-button"
          onClick={() => this.handleSearch(this.props.searchInput)}
        >
          Search
        </button>
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
