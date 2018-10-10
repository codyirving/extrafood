import React, { Component } from "react";
import decode from "jwt-decode";
import { connect } from "react-redux";
import { getAccessToken, getIdToken } from "../utils/AuthService";
import { claimListing } from "../actions/index";
import moment from "moment";
export class Listing extends Component {
  state = {
    showInterestedSection: false,
    showClaimDetails: false,
    userInfo: []
  };

  getClaimerEmail() {
    const idToken = getIdToken();
    try {
      console.log("ID TOKEN: " + JSON.stringify(decode(idToken)));
      console.log("Got Token!!: " + idToken);
      const userInfo = decode(idToken);
      console.log("user info: " + JSON.stringify(userInfo));
      this.setState({ userInfo: userInfo });
    } catch (e) {
      console.log("error", e);
    }
  }

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
    this.getClaimerEmail();
    if (await this.checkClaim(this.props.listing._id)) {
      this.props
        .dispatch(
          claimListing(this.props.listing._id, this.state.userInfo.email)
        )
        .then(alert("Success!"));
    } else {
      alert("oh no, this listing has already been claimed :(");
    }
  };
  async checkClaim(id) {
    let claimCheck = await fetch(
      `http://${process.env.REACT_APP_API_HOST}/foodlistings/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        mode: "cors", // no-cors, cors, *same-origin
        credentials: "same-origin"
      }
    )
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
      <li className="row-personal listing list-group-item">
        <div className="row basic-info">
          <div className="col-sm">
            <div className="row-personal column-label font-weight-bold pb-1">
              Date Listed
            </div>
            <div className="datePosted row-personal badge badge-primary badge-pill">
              {moment(this.props.listing.datePosted).format("MMM Do YY")}
            </div>
          </div>
          <div className="col-sm">
            <div className="row-personal column-label font-weight-bold pb-1 green-text">
              Food Description
            </div>
            <div className="itemDescription row-personal light-green-text">
              {this.props.listing.itemDescription}
            </div>
          </div>
          <div className="col-sm">
            <div className="row-personal column-label font-weight-bold pb-1">
              Date Expires
            </div>
            <div className="dateExpires row-personal badge badge-primary badge-pill">
              {moment(this.getExpires()).format("MMM Do YY")}
            </div>
          </div>
          <div className="col-sm">
            <div className="row-personal column-label font-weight-bold pb-1">
              More Info
            </div>
            <div className="moreInfo row-personal">
              <button className="btn btn-primary" onClick={this.moreInfo}>
                Interested!
              </button>
            </div>
          </div>
        </div>

        {this.state.showInterestedSection && (
          <div>
            <div className="row moreInfo info">
              <div className="pickupLocation col-sm">
                <div className="row-personal column-label font-weight-bold pb-1">
                  Pick-Up Location
                </div>
                {this.props.listing.pickupLocation}
              </div>
              <div className="listerContact-address col-sm">
                <div className="row-personal column-label font-weight-bold pb-1">
                  Pick-Up Address
                </div>
                <address>{this.getAddress()}</address>
              </div>
              <div className="listerContact-phoneNumber col-sm">
                <div className="row-personal column-label font-weight-bold pb-1">
                  Contact Address
                </div>
                {this.props.listing.listerContact &&
                  this.props.listing.listerContact.phoneNumber}
              </div>
              <div className="listerContact-names col-sm">
                <div className="row-personal column-label font-weight-bold pb-1">
                  Contact Name
                </div>
                {this.props.listing.listerContact &&
                  this.props.listing.listerContact.nameFirst}{" "}
                {this.props.listing.listerContact &&
                  this.props.listing.listerContact.nameLast}
              </div>
            </div>

            <div className="claim-listing row-personal">
              <button
                className="btn btn-info"
                onClick={e => this.claimListingDetails(e)}
              >
                Claim this listing!
              </button>
            </div>
          </div>
        )}

        {this.state.showClaimDetails && (
          <div className="row-personal">
            <div className="agree-to-conditions">
              <form>
                By claiming this listing, you agree to the terms and conditions{" "}
                <input type="checkbox" />
                <button className="btn btn-primary " onClick={this.postClaim}>
                  Claim it!
                </button>
              </form>
            </div>
          </div>
        )}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  showInterestedSection: state.showInterestedSection,
  showClaimDetails: state.showClaimDetails
});
export default connect(mapStateToProps)(Listing);
