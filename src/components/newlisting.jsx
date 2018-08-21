import React, { Component } from "react";
import { connect } from "react-redux";
import DayPicker from "react-day-picker";
import { postNewListing } from "../actions/index";
export class NewListing extends Component {
  state = {
    itemDescription: "",
    listerExtraNotes: "",
    dateAvailable: "",
    dateExpires: "",
    selfPickup: false,
    curbsidePickup: false,
    comeToDoor: false,
    meetUpAtLocation: false,
    willDropOff: false
  };
  constructor(props) {
    super(props);
    this.handleExpiresClick = this.handleExpiresClick.bind(this);
    this.handleAvailableClick = this.handleAvailableClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleExpiresClick(day) {
    console.log("day: " + day);
    this.setState({ dateExpires: day });
  }
  handleAvailableClick(day) {
    console.log("day: " + day);
    this.setState({ dateAvailable: day });
  }

  submitNewListing(e) {
    e.preventDefault();
    //console.log(this.state);
    this.props
      .dispatch(postNewListing(this.state))
      .then((window.location = "/"));
  }

  handleInputChange(event) {
    const target = event.target;
    const type = target.type;
    let value = "";
    if (type === "textbox" || "textarea") {
      value = target.value;
      console.log("found type");
    }
    if (type === "checkbox") {
      value = target.checked;
    }
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div className="row">
        <form>
          <div className="description row">
            <label
              htmlFor="food-description"
              className="food-description-label"
            >
              Food Description
            </label>
            <textarea
              type="textarea"
              className="food-description-input"
              name="itemDescription"
              onChange={this.handleInputChange}
              value={this.state.itemDescription}
            />
          </div>
          <br />
          <div className="pickup-notes row">
            <label htmlFor="pickup-notes" className="pickup-notes-label">
              Extra Pickup Notes
            </label>
            <textarea
              type="textarea"
              className="lister-extra-notes-input"
              name="listerExtraNotes"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="date-pickers row">
            <div className="col-6">
              <label
                htmlFor="food-available-date"
                className="food-available-label"
              >
                Available Date
              </label>
              <input
                type="textbox"
                className="food-available-date-input"
                name="dateAvailable"
                value={
                  this.state.dateAvailable
                    ? this.state.dateAvailable.toLocaleDateString()
                    : "Select Available Date"
                }
                onChange={this.handleInputChange}
              />
              <DayPicker onDayClick={this.handleAvailableClick} />
            </div>
            <div className="col-6">
              <label
                htmlFor="food-expiration-date"
                className="food-expiration-label"
              >
                Expiration Date
              </label>
              <input
                type="textbox"
                className="food-expiration-date-input"
                name="dateExpires"
                value={
                  this.state.dateExpires
                    ? this.state.dateExpires.toLocaleDateString()
                    : "Select Expiration Date"
                }
                onChange={this.handleInputChange}
              />
              <DayPicker onDayClick={this.handleExpiresClick} />
            </div>
          </div>
          <br />
          <div className="checkbox-options row">
            <label>
              Self Pickup:
              <input
                type="checkbox"
                name="selfPickup"
                className="checkbox-option"
                checked={this.state.selfPickup}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <label>
              Curbside Pickup:
              <input
                type="checkbox"
                name="curbsidePickup"
                className="checkbox-option"
                checked={this.state.curbsidePickup}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <label>
              Come to Door:
              <input
                type="checkbox"
                name="comeToDoor"
                className="checkbox-option"
                checked={this.state.comeToDoor}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <label>
              Meet up at agreed location:
              <input
                type="checkbox"
                name="meetUpAtLocation"
                className="checkbox-option"
                checked={this.state.meetUpAtLocation}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <label>
              Will drop off at agreed location:
              <input
                type="checkbox"
                name="willDropOff"
                className="checkbox-option"
                checked={this.state.willDropOff}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
          </div>
          <button
            className="btn btn-default"
            onClick={e => this.submitNewListing(e)}
          >
            POST LISTING
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewListing);