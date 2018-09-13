import React, { Component } from "react";
import Redux from "react-redux";
import { connect } from "react-redux";
import { getAccessToken } from "../utils/AuthService";
import {
  claimListing,
  refreshData,
  toggleInterestedSection,
  refData
} from "../actions/index";

export class Listing extends Component {
  state = {
    showInterestedSection: false,
    showClaimDetails: false
  };
  moreInfo = () => {
    console.log(this.props.listing);
    //this.setState({ showDetails: !this.state.showInterestedSection });
    this.setState({ showInterestedSection: !this.state.showInterestedSection });
    //this.props.dispatch(toggleInterestedSection(this.props.listing));
  };
  claimListingDetails = e => {
    console.log("claiming listing");
    //this.setState({ showClaimDetails: !this.state.showClaimDetails });
    //this.props.dispatch(claimListing(this.props.listing._id));
    this.setState({ showClaimDetails: !this.state.showClaimDetails });
  };
  postClaim = async e => {
    e.preventDefault();
    if (await this.checkClaim(this.props.listing._id)) {
      this.props
        .dispatch(claimListing(this.props.listing._id))
        .then(alert("Success!"));
    } else {
      alert("oh no, this listing has already been claimed :(");
    }
  };
  async checkClaim(id) {
    let claimCheck = await fetch("http://localhost:3001/foodlistings/", {
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
        console.log("data!", data);
        return data;
      })
      .catch(err => console.log("Uh Oh..." + err));
    if (claimCheck) {
      let currentClaim = claimCheck.filter(listing => listing._id === id);
      console.log("claimed? " + JSON.stringify(currentClaim[0].claimed));
      if (currentClaim[0].claimed === false) return true;
      else return false;
    } else return false;
  }
  componentDidMount(nextProps) {
    console.log("listing did mount");

    console.log(this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log("willRecieveProps");
  }
  getExpires() {
    return typeof this.props.listing.dateExpires === "undefined"
      ? "No expiration"
      : this.props.listing.dateExpires;
  }
  getAddress() {
    return this.props.listing.listerContact
      ? this.props.listing.listerContact.address
      : "unavailable";
  }
  render() {
    //console.log("rendering listing with props: " + JSON.stringify(this.props));
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
            <div className="dateExpires row">{this.getExpires()}</div>
          </div>
          <div className="col-3">
            <div className="row column-label">More Info</div>
            <div className="moreInfo row">
              <button class="btn btn-info" onClick={this.moreInfo}>
                Interested!
              </button>
            </div>
          </div>
        </div>

        {this.state.showInterestedSection && (
          <div>
            <div className="row moreInfo info">
              <div className="pickupLocation col-3">
                <div className="row column-label">Pick-Up Location</div>
                {this.props.listing.pickupLocation}
              </div>
              <div className="listerContact-address col-3">
                <div className="row column-label">Pick-Up Address</div>
                <address>{this.getAddress()}</address>
              </div>
              <div className="listerContact-phoneNumber col-3">
                <div className="row column-label">Contact Address</div>
                {this.props.listing.listerContact &&
                  this.props.listing.listerContact.phoneNumber}
              </div>
              <div className="listerContact-names col-3">
                <div className="row column-label">Contact Name</div>
                {this.props.listing.listerContact &&
                  this.props.listing.listerContact.nameFirst}{" "}
                {this.props.listing.listerContact &&
                  this.props.listing.listerContact.nameLast}
              </div>
            </div>

            <div className="claim-listing row">
              <button
                class="btn btn-info"
                onClick={e => this.claimListingDetails(e)}
              >
                Claim this listing!
              </button>
            </div>
          </div>
        )}

        {this.state.showClaimDetails && (
          <div className="row">
            <div className="agree-to-conditions">
              <form>
                By claiming this listing, you agree to the terms and conditions{" "}
                <input type="checkbox" />
                <button class="btn btn-success" onClick={this.postClaim}>
                  Claim it!
                </button>
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
