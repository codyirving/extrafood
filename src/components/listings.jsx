import React, { Component } from "react";
import Redux from "react-redux";
import { connect } from "react-redux";
import {
  updateFilteredList,
  refData,
  applyClaimedFilter
} from "../actions/index";
import Listing from "../components/listing";

export class Listings extends Component {
  constructor(props) {
    super(props);
    console.log("listing props constructor: " + JSON.stringify(props));
  }

  componentDidMount() {
    //console.log(this.props.listings);
    //const filteredListings = this.props.listings;
    console.log("listings did mount: " + JSON.stringify(this.props));
    //this.props.dispatch(refData());
    //console.log("listings did mount: " + JSON.stringify(store.getState()));

    //this.props.onFilter(this.props.listings);
    //this.setState({ newFilteredListings: this.tempList });
  }

  handleClaimClick = _id => {
    console.log("handling claim click");

    // const newFilteredListings = this.props.listings
    //   .filter(listing => listing.claimed !== true)
    //   .map(listing => (
    //     <Listing
    //       listing={listing}
    //       key={listing._id}
    //       onClick={this.handleClaimClick}
    //     />
    //   ));
    // this.props.onFilter(newFilteredListings);

    // this.setState({ newFilteredListings: newFilteredListings });
    this.props.onClaimed();
  };

  spitOutListings = () => {};

  componentWillUpdate() {
    console.log("component will update");
    console.log("will update props: " + JSON.stringify(this.props));
  }
  render() {
    // const newFilteredListings = [];

    // if (this.props.listings.data) {
    //   this.props.listings.data
    //     .filter(listing => listing.claimed !== true)
    //     .map(listing => <Listing />);
    //   //this.props.onFilter(newFilteredListings);
    // }

    return this.props.listings
      ? this.props.listings.length > 0
        ? this.props.listings
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
