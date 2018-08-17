import React, { Component } from "react";
import Redux from "react-redux";
import { connect } from "react-redux";

import {
  claimListing,
  refreshData,
  toggleInterestedSection
} from "../actions/index";

export class Listing extends Component {
  moreInfo = () => {
    console.log(this.props.listing);
    //this.setState({ showDetails: !this.state.showInterestedSection });
    this.props.dispatch(toggleInterestedSection());
  };
  claimListing = e => {
    console.log("claiming listing");
    //this.setState({ showClaimDetails: !this.state.showClaimDetails });
    this.props.dispatch(claimListing(this.props.listing._id));
  };
  postClaim = e => {
    e.preventDefault();
    const payload = {
      _id: this.props.listing._id,
      claimed: "true",
      claimedDate: new Date()
    };

    const postData = (url = "", data = {}) => {
      // Default options are marked with *

      return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
          "Content-Type": "application/json; charset=utf-8"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
        .then(response => response.json()) // parses response to JSON
        .then(this.props.onClick(this.props.listing._id))
        .catch(error => console.error(`Fetch Error =\n`, error));
    };

    postData("http://localhost:3001/foodlistings/claim", payload)
      .then(data => console.log(data))
      .then(this.props.dispatch(toggleInterestedSection)) // JSON from `response.json()` call
      .catch(error => console.error(error));
  };

  componentDidMount() {
    console.log("listing did mount");
    console.log(this.props);
  }
  render() {
    console.log("rendering listing with props: " + JSON.stringify(this.props));
    //const { dateExpires, itemDescription, datePosted } = this.props.listing;
    return (
      //TODO Automatically filter expiredListings
      <div className="row listing">
        <div className="row basic-info">
          <div className="col-3">
            <div className="row column-label">Date Listed</div>
            <div className="datePosted row">
              {this.props.listing.datePosted}
            </div>
          </div>
          <div className="col-3">
            <div className="row column-label">Food Description</div>
            <div className="itemDescription row">
              {this.props.listing.itemDescription}
            </div>
          </div>
          <div className="col-3">
            <div className="row column-label">Date Expires</div>
            <div className="dateExpires row">
              {this.props.listing.dateExpires === undefined
                ? "No expiration"
                : this.props.listing.dateExpires}
            </div>
          </div>
          <div className="col-3">
            <div className="row column-label">More Info</div>
            <div className="moreInfo row">
              <button onClick={this.moreInfo}>Interested!</button>
            </div>
          </div>
        </div>

        {this.props.showInterestedSection && (
          <div>
            <div className="row moreInfo">
              <div className="pickupLocation col-3">
                {this.props.listing.pickupLocation}
              </div>
              <div className="listerContact-address col-3">
                {this.props.listing.listerContact.address}
              </div>
              <div className="listerContact-phoneNumber col-3">
                {this.props.listing.listerContact.phoneNumber}
              </div>
              <div className="listerContact-names col-3">
                {this.props.listing.listerContact.nameFirst}{" "}
                {this.props.listing.listerContact.nameLast}
              </div>
            </div>

            <div className="claim-listing row">
              <button onClick={e => this.claimListing(e)}>
                Claim this listing!
              </button>
            </div>
          </div>
        )}

        {this.props.showClaimDetails && (
          <div className="row">
            <div className="agree-to-conditions">
              <form>
                By claiming this listing, you agree to the terms and conditions{" "}
                <input type="checkbox" />
                <button onClick={this.postClaim}>Claim it!</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listings,
  filteredListings: state.filteredListings,
  showInterestedSection: state.showInterestedSection,
  showClaimDetails: state.showClaimDetails
});
export default connect(mapStateToProps)(Listing);
