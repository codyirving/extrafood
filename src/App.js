import React, { Component } from "react";
import NavBar from "./components/navbar";
import "./App.css";

import { Badge } from "react-bootstrap";

class Listing extends Component {
  state = {
    showDetails: false
  };
  moreInfo = () => {
    console.log(this.props.listing);
    this.setState({ showDetails: !this.state.showDetails });
  };
  render() {
    const { dateExpires, itemDescription, datePosted } = this.props.listing;
    return (
      //TODO Automatically filter expiredListings
      <div className="row listing">
        <div className="row column-headings">
          <div className="col-3">Date Listed</div>
          <div className="col-3">Food Description</div>
          <div className="col-3">Date Expires</div>
          <div className="col-3">More Info</div>
        </div>
        <div className="dateExpires col-3">
          {dateExpires === undefined ? "No expiration" : dateExpires}
        </div>
        <div className="itemDescription col-3">{itemDescription}</div>
        <div className="datePosted col-3">{datePosted}</div>
        <div className="moreInfo col-3">
          <button onClick={this.moreInfo}>Interested!</button>
        </div>
        {this.state.showDetails && (
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
