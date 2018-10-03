import React, { Component } from "react";
import { connect } from "react-redux";
import Listing from "../components/listing";

export class Listings extends Component {
  constructor(props) {
    super(props);
    console.log("listing props constructor: " + JSON.stringify(props));
  }

  handleClaimClick = _id => {
    console.log("handling claim click");
    this.props.onClaimed();
  };

  render() {
    return this.props.filteredListings
      ? this.props.filteredListings.length > 0
        ? this.props.filteredListings
            .filter(listing => listing.claimed !== true)
            .map(listing => <Listing listing={listing} key={listing._id} />)
        : null
      : null;
  }
}

const mapStateToProps = state => ({
  listings: state.listings,
  filteredListings: state.filteredListings
});
export default connect(mapStateToProps)(Listings);
