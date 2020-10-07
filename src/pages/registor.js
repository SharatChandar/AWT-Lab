import React, { Component } from "react";
import "./pages.css";
import "./bootstrap.css";
import Navbar from "./navbar_signup";
import { Container } from "reactstrap";

class Registor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      phone: "",
      email: "",
      address: "",

      username: "",
      password: "",
      password2: "",
      msg: "",
    };

    this.onChange = this.onChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handlesubmit(e) {
    e.preventDefault();
    if (
      (this.state.username !== "") &
      (this.state.password !== "") &
      (this.state.fullname !== "") &
      (this.state.email !== "") &
      (this.state.phone !== "") &
      (this.state.address !== "")
    ) {
      if (this.state.password === this.state.password2) {
        const post = {
          username: this.state.username,
          password: this.state.password,
          fullname: this.state.fullname,
          email: this.state.email,
          phone: this.state.phone,
          address: this.state.address,
        };
        fetch("/registor", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(post),
        }).then((res) => res.json());
        this.props.history.push("/");
      } else {
        this.setState({ msg: "password must match...." });
      }
    } else {
      this.setState({ msg: "all fields required....." });
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <Container>
          <div className="loginpage">
            <div className="regbox">
              <form onSubmit={this.handlesubmit}>
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  value={this.state.fullname}
                  onChange={this.onChange}
                />
                <label>Phone No:</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
                <label>Email</label>

                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={this.state.address}
                  onChange={this.onChange}
                />
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChange}
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <label>Conform Password</label>
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btnn"
                />
                <label className="msgreg"> {this.state.msg}</label>
              </form>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Registor;
