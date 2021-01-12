import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import "../styles/Profile.css";
import "../styles/CardItem.css";

class Profile extends Component {
  state = {
    allItems: [],
    user: [],
  };

  handleChange = (event) => {
    const value = event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { authContext } = this.props;
    const userId = authContext.user._id;
    apiHandler
      .patch("/api/users/me/" + userId, { phoneNumber: this.state.phoneNumber })
      .then((data) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    const { authContext } = this.props;
    const { user } = authContext;
    const userId = authContext.user._id;
    apiHandler
      .getItems()
      .then((items) => {
        this.setState({
          allItems: items.filter((item) => item.id_user === user._id),
        });
      })
      .catch((err) => console.log(err));

    apiHandler.get("/api/users/me/" + userId).then((apiResponse) => {
      console.log(apiResponse);
      this.setState({
        user: apiResponse.data,
      });
    });
  }

  handleDelete = (id) => {
    const { authContext } = this.props;
    const { user } = authContext;
    apiHandler
      .deleteItem(`/api/items/${id}`)
      .then(() => {
        this.setState({
          allItems: this.state.allItems.filter(
            (item) => item.id_user !== user._id
          ),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderPhone() {
    const { authContext } = this.props;
    if (this.state.user.phoneNumber === "")
      return (
        <div className="user-contact">
          <h4>Add a phone number</h4>
          <form
            className="form"
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          >
            <div className="form-group">
              <label className="label" htmlFor="phoneNumber">
                Phone number
              </label>
              <input
                className="input"
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                placeholder="Add phone number"
              />
            </div>
            <button className="form__button">Add phone number</button>
          </form>
        </div>
      );
    else {
      return (
        <div>
          <h4> You phone number is</h4>
          <p>{this.state.user.phoneNumber} </p>
        </div>
      );
    }
  }

  render() {
    const { authContext } = this.props;
    const { user } = authContext;
    console.log(this.state);

    return (
      <div style={{ padding: "100px", fontSize: "1.25rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          This is profile, it's protected !
        </h2>
        <p>
          Checkout the<b>ProtectedRoute</b> component in
          <code>./components/ProtectRoute.jsx</code>
        </p>
        <a
          style={{ color: "dodgerblue", fontWeight: "bold" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://reacttraining.com/react-router/web/example/auth-workflow"
        >
          React router dom Demo of a protected route
        </a>

        <section className="Profile">
          <div className="user-image round-image">
            <img src={user.profileImg} alt={user.firstName} />
          </div>
          <div className="user-presentation">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>
          {this.renderPhone()}
          {/* Break whatever is belo  */}
          {this.state.allItems.length === 0 && (
            <div className="CardItem">
              <div className="item-empty">
                <div className="round-image">
                  <img src="/media/personal-page-empty-state.svg" alt="" />
                </div>
                <p>You don't have any items :(</p>
              </div>
            </div>
          )}

          {this.state.allItems.length > 0 && (
            <div className="CardItem">
              <h3>Your items</h3>
              {this.state.allItems.map((item) => (
                <div className="item">
                  <div className="round-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="description">
                    <h2>{item.name}</h2>
                    <h4>Quantity: {item.quantity}</h4>
                    <p>{item.description}</p>
                    <div className="buttons">
                      <span>
                        <button
                          onClick={() => this.handleDelete(item._id)}
                          className="btn-secondary"
                        >
                          Delete
                        </button>
                      </span>
                      <span>
                        <Link to={`/item/edit/${item._id}`}>
                          <button className="btn-primary">Edit</button>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default withUser(Profile);
