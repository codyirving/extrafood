import React, { Component } from "react";
import NavBar from "./components/navbar";
import ClaimFood from "./components/claimfood";
import "./App.css";
import { connect } from "react-redux";
import DayPicker from "react-day-picker";
import { refData } from "./actions/index";
import "react-day-picker/lib/style.css";

// class Listing extends Component {
//   state = {
//     showDetails: false,
//     showClaimDetails: false
//   };
//   moreInfo = () => {
//     console.log(this.props.listing);
//     this.setState({ showDetails: !this.state.showDetails });
//   };
//   claimListing = e => {
//     console.log("claiming listing");
//     //this.setState({ showClaimDetails: !this.state.showClaimDetails });
//     this.props.dispatch(claimListing(this.props.listing._id));
//   };
//   postClaim = e => {
//     e.preventDefault();
//     const payload = {
//       _id: this.props.listing._id,
//       claimed: "true",
//       claimedDate: new Date()
//     };

//     const postData = (url = "", data = {}) => {
//       // Default options are marked with *

//       return fetch(url, {
//         method: "POST", // *GET, POST, PUT, DELETE, etc.
//         mode: "cors", // no-cors, cors, *same-origin
//         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: "same-origin", // include, same-origin, *omit
//         headers: {
//           "Content-Type": "application/json; charset=utf-8"
//           // "Content-Type": "application/x-www-form-urlencoded",
//         },
//         redirect: "follow", // manual, *follow, error
//         referrer: "no-referrer", // no-referrer, *client
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//       })
//         .then(response => response.json()) // parses response to JSON
//         .then(this.props.onClick(this.props.listing._id))
//         .catch(error => console.error(`Fetch Error =\n`, error));
//     };

//     postData("http://localhost:3001/foodlistings/claim", payload)
//       .then(data => console.log(data))
//       .then(this.props.onClick(this.props.listing._id)) // JSON from `response.json()` call
//       .catch(error => console.error(error));
//   };

//   render() {
//     console.log("rendering listing");
//     const { dateExpires, itemDescription, datePosted } = this.props.listing;
//     return (
//       //TODO Automatically filter expiredListings
//       <div className="row listing">
//         <div className="row basic-info">
//           <div className="col-3">
//             <div className="row column-label">Date Listed</div>
//             <div className="datePosted row">{datePosted}</div>
//           </div>
//           <div className="col-3">
//             <div className="row column-label">Food Description</div>
//             <div className="itemDescription row">{itemDescription}</div>
//           </div>
//           <div className="col-3">
//             <div className="row column-label">Date Expires</div>
//             <div className="dateExpires row">
//               {dateExpires === undefined ? "No expiration" : dateExpires}
//             </div>
//           </div>
//           <div className="col-3">
//             <div className="row column-label">More Info</div>
//             <div className="moreInfo row">
//               <button onClick={this.moreInfo}>Interested!</button>
//             </div>
//           </div>
//         </div>

//         {this.state.showDetails && (
//           <div>
//             <div className="row moreInfo">
//               <div className="pickupLocation col-3">
//                 {this.props.listing.pickupLocation}
//               </div>
//               <div className="listerContact-address col-3">
//                 {this.props.listing.listerContact.address}
//               </div>
//               <div className="listerContact-phoneNumber col-3">
//                 {this.props.listing.listerContact.phoneNumber}
//               </div>
//               <div className="listerContact-names col-3">
//                 {this.props.listing.listerContact.nameFirst}{" "}
//                 {this.props.listing.listerContact.nameLast}
//               </div>
//             </div>

//             <div className="claim-listing row">
//               <button onClick={e => this.claimListing(e)}>
//                 Claim this listing!
//               </button>
//             </div>
//           </div>
//         )}

//         {this.state.showClaimDetails && (
//           <div className="row">
//             <div className="agree-to-conditions">
//               <form>
//                 By claiming this listing, you agree to the terms and conditions{" "}
//                 <input type="checkbox" />
//                 <button onClick={this.postClaim}>Claim it!</button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
// class Listings extends Component {
//   constructor(props) {
//     super(props);
//   }
//   state = {
//     newFilteredListings: []
//   };
//   componentDidMount() {
//     //console.log(this.props.listings);
//     //const filteredListings = this.props.listings;
//     // console.log("filtered: " + filteredListings);
//     //this.props.onFilter(newFilteredListings);
//     this.setState({ newFilteredListings: this.tempList });
//   }

//   handleClaimClick = _id => {
//     console.log("handling claim click");

//     // const newFilteredListings = this.props.listings
//     //   .filter(listing => listing.claimed !== true)
//     //   .map(listing => (
//     //     <Listing
//     //       listing={listing}
//     //       key={listing._id}
//     //       onClick={this.handleClaimClick}
//     //     />
//     //   ));
//     // this.props.onFilter(newFilteredListings);

//     // this.setState({ newFilteredListings: newFilteredListings });
//     this.props.onClaimed();
//   };
//   tempList = {};
//   render() {
//     console.log("first listings prop: " + JSON.stringify(this.props));
//     const { listings } = this.props;
//     const newFilteredListings = listings
//       .filter(listing => listing.claimed !== true)
//       .map(listing => <Listing listing={listing} key={listing._id} />);
//     console.log("first filter and map: " + newFilteredListings);
//     this.tempList = newFilteredListings;
//     return newFilteredListings.length > 0 ? newFilteredListings : null;
//   }
// }
// class SearchListings extends Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }
//   state = {
//     input: ""
//   };
//   handleChange = e => {
//     console.log("handling change " + e.target.value);
//     this.setState({ input: e.target.value }, () =>
//       this.props.onClick(this.state.input)
//     );
//   };
//   render() {
//     return (
//       <div>
//         <input type="textbox" name="input" onChange={this.handleChange} />
//         <button onClick={() => this.props.onClick(this.state.input)}>
//           Search
//         </button>
//       </div>
//     );
//   }
// }

class NewListing extends Component {
  state = {
    selectedExpireDay: false
  };
  constructor(props) {
    super(props);
    this.handleExpiresClick = this.handleExpiresClick.bind(this);
    this.handleAvailableClick = this.handleAvailableClick.bind(this);
  }
  handleExpiresClick(day) {
    console.log("day: " + day);
    this.setState({ selectedExpireDay: day });
  }
  handleAvailableClick(day) {
    console.log("day: " + day);
    this.setState({ selectedAvailableDay: day });
  }

  render() {
    return (
      <div className="row">
        <form>
          <div className="description row">
            <label for="food-description" className="food-description-label">
              Food Description
            </label>
            <textarea
              type="textarea"
              className="food-description-input"
              name="food-description"
            />
          </div>
          <br />
          <div className="pickup-notes row">
            <label for="pickup-notes" className="pickup-notes-label">
              Pickup Notes
            </label>
            <textarea
              type="textarea"
              className="pickup-notes-input"
              name="pick-notes"
            />
          </div>
          <div className="date-pickers row">
            <div className="col-6">
              <label
                for="food-expiration-date"
                className="food-expiration-label"
              >
                Expiration Date
              </label>
              <input
                type="textbox"
                className="food-expiration-date-input"
                name="food-expiration-date"
                value={
                  this.state.selectedExpireDay
                    ? this.state.selectedExpireDay.toLocaleDateString()
                    : "Select Expiration Date"
                }
              />
              <DayPicker onDayClick={this.handleExpiresClick} />
            </div>

            <div className="col-6">
              <label for="food-available-date" className="food-available-label">
                Available Date
              </label>
              <input
                type="textbox"
                className="food-available-date-input"
                name="food-available-date"
                value={
                  this.state.selectedAvailableDay
                    ? this.state.selectedAvailableDay.toLocaleDateString()
                    : "Select Available Date"
                }
              />
              <DayPicker onDayClick={this.handleAvailableClick} />
            </div>
          </div>
          <br />

          <button className="btn btn-default">POST LISTING</button>
        </form>
      </div>
    );
  }
}
class ListFood extends Component {
  render() {
    return (
      <React.Fragment>
        <NewListing />
      </React.Fragment>
    );
  }
}
// class ClaimFood extends Component {
//   state = {
//     filterWords: ["tomatoes"],
//     listings: [],
//     filteredListings: []
//   };

//   componentDidMount() {
//     this.props.dispatch(refreshData());
//   }
//   constructor() {
//     super();
//     console.log("app-constructor");
//   }
//   componentDidUpdate(prevProps, prevState) {
//     console.log("prevProps", prevProps);
//     console.log("prevState", prevState);
//   }
//   // refreshData = () => {
//   //   console.log("REFRESHING DATA");
//   //   fetch("http://localhost:3001/foodlistings/")
//   //     .then(response => response.json())
//   //     .then(data => this.setState({ listings: data, filteredListings: data }));
//   // };
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
//   // handleClaimed = _id => {
//   //   const updatedListing = this.state.listings
//   //     .filter(listing => listing._id === _id)
//   //     .map(listing => (listing.claimed = true));
//   //   const listingIndex = this.state.listings.findIndex(
//   //     listing => listing._id === _id
//   //   );
//   //   const updatedList = [
//   //     ...this.state.listings.slice(0, listingIndex),
//   //     updatedListing,
//   //     ...this.state.listing.slice(listingIndex + 1)
//   //   ];

//   //   this.setState({ filteredListings: updatedList });
//   // };
//   handleFilter = newFilteredListings => {
//     this.setState({ filteredListings: newFilteredListings });
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <SearchListings onClick={this.handleSearch} />
//         <RefreshData onClick={this.refreshData} />
//         <Badge>42</Badge>
//         <Listings
//           listings={this.state.filteredListings}
//           key={this.state.filteredListings._id}
//           onClaimed={this.refreshData}
//           onFilter={this.handleFilter}
//         />
//       </React.Fragment>
//     );
//   }
// }

export class App extends Component {
  componentDidMount() {
    console.log("App component did mount");
    this.props.dispatch(refData());
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container" />
        {this.props.togglePage && <ClaimFood />}
        {!this.props.togglePage && <ListFood />}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  togglePage: state.togglePage,
  listings: state.listings,
  filteredListings: state.filteredListings
});
export default connect(mapStateToProps)(App);
