import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";

class ItemFormEdit extends Component {
  state = {
    name: "",
    category: "",
    quantity: 0,
    address: "",
    description: "",
  };

  componentDidMount() {
    const itemId = this.props.match.params.id;

    apiHandler
      .getSingleItem(`/api/items/${itemId}`)
      .then((apiResponse) => {
        this.setState({
          name: apiResponse.name,
          category: apiResponse.name,
          quantity: apiResponse.quantity,
          address: apiResponse.address,
          description: apiResponse.description,
          location: {
            type: apiResponse.location.type,
            coordinates: apiResponse.location.coordinates,
          },
          formattedAddress: apiResponse.location.formattedAddress,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const itemId = this.props.match.params.id;
    event.preventDefault();
    const body = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      quantity: this.state.quantity,
      address: this.state.address,
      location: {
        type: this.state.location.type,
        coordinates: this.state.location.coordinates,
      },
      formattedAddress: this.state.location.formattedAddress,
    };
    this.props.history.push("/");

    apiHandler
      .patch(`/api/items/${itemId}`, body)
      .then((apiResponse) => {
        console.log(apiResponse);
      })
      .catch((err) => {
        console.log(err);
      });

    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Vladimir "Vladi vlad" Novopashin @stackoverflow : ) => https://stackoverflow.com/a/42483509
  };

  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.

    this.setState({
      [place.place_type]: place.place_name,

      ["location"]: {
        ["type"]: place.geometry.type,
        ["coordinates"]: [
          place.geometry.coordinates[0],
          place.geometry.coordinates[1],
        ],

        ["formattedAddress"]: place.place_name,
      },
    });
  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Edit Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              onChange={this.handleChange}
              value={this.state.name}
              name="name"
              placeholder="What are you giving away ?"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select
              onChange={this.handleChange}
              value={this.state.category}
              name="category"
              id="category"
              defaultValue="-1"
            >
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.quantity}
              name="quantity"
              className="input"
              id="quantity"
              type="number"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input className="input" id="image" type="file" />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>

            <div>
              <input
                type="radio"
                id="usermail"
                name="contact"
                value="usermail"
                onChange={this.handleChange}
              />
              user email
              <input
                type="radio"
                id="phonenumber"
                name="contact"
                value="phonenumber"
                onChange={this.handleChange}
              />
              contact phone number
            </div>
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Edit Item</button>
        </form>
      </div>
    );
  }
}

export default withUser(ItemFormEdit);
