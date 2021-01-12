import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class ProfileForm extends Component {
  state = {};

  componentDidMount() {
    const { authContext } = this.props;
    const { user } = authContext;
    const userId = authContext.user._id;

    apiHandler
      .getSingleItem(`/api/users/me/${userId}`)
      .then((apiResponse) => {
        this.setState({
          email: apiResponse.email,
          lastName: apiResponse.lastName,
          firstName: apiResponse.firstName,
          phoneNumber: apiResponse.phoneNumber,
          password: apiResponse.password,
          profileImg: apiResponse.profileImg,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    const { authContext } = this.props;
    const { user } = authContext;
    const userId = authContext.user._id;
    event.preventDefault();
    const body = {
      email: this.state.email,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      profileImg: this.state.profileImg,
    };
    this.props.history.push("/");

    apiHandler
      .patch(`/api/users/me/${userId}`, body)
      .then((apiResponse) => {
        console.log(apiResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <section className="form-section">
        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h2 className="title">Edit account</h2>
          <div className="form-group">
            <div className="user-image round-image">
              <img src={this.state.profileImg} alt={this.state.firstName} />
              <button>Change profile picture</button>
            </div>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              value={this.state.firstName}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
              value={this.state.lastName}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              value={this.state.email}
              className="input"
              id="email"
              type="email"
              name="email"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="phoneNumber">
              Phone
            </label>
            <input
              className="input"
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              value={this.state.phoneNumber}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
            />
          </div>

          <button className="btn-submit">Edit profile</button>
        </form>
      </section>
    );
  }
}

export default withRouter(withUser(ProfileForm));
