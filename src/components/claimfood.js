import React, { Component } from "react";
import Redux from "react-redux";
import { connect } from "react-redux";
import SearchListings from "../components/searchlistings.jsx";
import RefreshData from "../components/refreshdata.jsx";
import Listings from "../components/listings";
import {
  claimListing,
  refData,
  toggleInterestedSection
} from "../actions/index";
export class ClaimFood extends Component {
  constructor(props) {
    super(props);
    console.log("app-constructor");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
  }
  // refreshData = () => {
  //   console.log("REFRESHING DATA");
  //   fetch("http://localhost:3001/foodlistings/")
  //     .then(response => response.json())
  //     .then(data => this.setState({ listings: data, filteredListings: data }));
  // };
  //   handleSearch = input => {
  //     console.log("handling Search: " + input);
  //     const filteredList = this.state.listings.filter(listing => {
  //       return (
  //         listing.itemDescription.includes(input) === true &&
  //         listing.itemDescription
  //       );
  //     });
  //     this.setState({ filteredListings: filteredList });
  //   };
  // handleClaimed = _id => {
  //   const updatedListing = this.state.listings
  //     .filter(listing => listing._id === _id)
  //     .map(listing => (listing.claimed = true));
  //   const listingIndex = this.state.listings.findIndex(
  //     listing => listing._id === _id
  //   );
  //   const updatedList = [
  //     ...this.state.listings.slice(0, listingIndex),
  //     updatedListing,
  //     ...this.state.listing.slice(listingIndex + 1)
  //   ];

  //   this.setState({ filteredListings: updatedList });
  // };
  //   handleFilter = newFilteredListings => {
  //     this.setState({ filteredListings: newFilteredListings });
  //   };
  componentDidMount() {
    console.log("claim food comp did mount.: ");
    //this.props.dispatch(refData());
  }
  render() {
    return (
      <React.Fragment>
        <div className="row search-refresh">
          <SearchListings />
          <RefreshData />
        </div>
        <Listings />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  listings: state.listings,
  filteredListings: state.filteredListings
});
export default connect()(ClaimFood);
