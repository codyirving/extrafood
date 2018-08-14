import React, { Component } from "react";

import NavBar from "./components/navbar";
import "./App.css";

import { Badge } from "react-bootstrap";

class Listing extends Component {
  state = {
    showDetails: false,
    showClaimDetails: false
  };
  moreInfo = () => {
    console.log(this.props.listing);
    this.setState({ showDetails: !this.state.showDetails });
  };
  claimListing = () => {
    console.log("claiming listing");
    this.setState({ showClaimDetails: !this.state.showClaimDetails });
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
        .catch(error => console.error(`Fetch Error =\n`, error));
    };

    postData("http://localhost:3001/foodlistings/claim", payload)
      .then(data => console.log(data)) // JSON from `response.json()` call
      .catch(error => console.error(error));
  };

  render() {
    const { dateExpires, itemDescription, datePosted } = this.props.listing;
    return (
      //TODO Automatically filter expiredListings
      <div className="row listing">
        <div className="row basic-info">
          <div className="col-3">
            <div className="row column-label">Date Listed</div>
            <div className="datePosted row">{datePosted}</div>
          </div>
          <div className="col-3">
            <div className="row column-label">Food Description</div>
            <div className="itemDescription row">{itemDescription}</div>
          </div>
          <div className="col-3">
            <div className="row column-label">Date Expires</div>
            <div className="dateExpires row">
              {dateExpires === undefined ? "No expiration" : dateExpires}
            </div>
          </div>
          <div className="col-3">
            <div className="row column-label">More Info</div>
            <div className="moreInfo row">
              <button onClick={this.moreInfo}>Interested!</button>
            </div>
          </div>
        </div>

        {this.state.showDetails && (
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
              <button onClick={this.claimListing}>Claim this listing!</button>
            </div>
            {this.state.showClaimDetails && (
              <div>
                <div className="claim-disclaimer row">
                  {" "}
                  By claiming this listing, you agree to the terms and
                  conditions{" "}
                </div>
                <div className="agree-to-conditions">
                  <form>
                    <input type="checkbox" />
                    <button onClick={this.postClaim}>Claim it!</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const Listings = ({ listings }) => {
  console.log("listing! " + JSON.stringify(listings));
  return listings.map(listing => (
    <Listing listing={listing} key={listing._id} />
  ));
};

class SearchListings extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    input: ""
  };
  handleChange = e => {
    console.log("handling change " + e.target.value);
    this.setState({ input: e.target.value }, () =>
      this.props.onClick(this.state.input)
    );
  };
  render() {
    return (
      <div>
        <input type="textbox" name="input" onChange={this.handleChange} />
        <button onClick={() => this.props.onClick(this.state.input)}>
          Search
        </button>
      </div>
    );
  }
}
class RefreshData extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.onClick()}>REFRESH LISTINGS</button>
      </div>
    );
  }
}
class App extends Component {
  state = {
    filterWords: ["tomatoes"],
    listings: [],
    filteredListings: []
  };

  componentDidMount() {
    console.log("mounted");

    fetch("http://localhost:3001/foodlistings/")
      .then(response => response.json())
      .then(data => this.setState({ listings: data, filteredListings: data }));
  }

  constructor() {
    super();
    console.log("app-constructor");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
  }
  refreshData = () => {
    fetch("http://localhost:3001/foodlistings/")
      .then(response => response.json())
      .then(data => this.setState({ listings: data, filteredListings: data }));
  };
  handleSearch = input => {
    console.log("handling Search: " + input);
    const filteredList = this.state.listings.filter(listing => {
      return (
        listing.itemDescription.includes(input) === true &&
        listing.itemDescription
      );
    });
    this.setState({ filteredListings: filteredList });
  };

  render() {
    console.log("render: " + this.state.filterWords);
    return (
      <React.Fragment>
        <NavBar numberOfItems={this.state.filteredListings.length} />
        <main className="container">
          <SearchListings onClick={this.handleSearch} />
          <RefreshData onClick={this.refreshData} />
          <Badge>42</Badge>
          <Listings
            listings={this.state.filteredListings}
            key={this.state.filteredListings._id}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
