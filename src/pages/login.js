import React, { Component } from "react";
import "./pages.css";
import "./bootstrap.css";
import Navbar from "./navbar_signup";
import setAuthToken from "./../actions/aaxios";
import { Container } from "reactstrap";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      massage: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handlesubmit(e) {
    e.preventDefault();

    const post = {
      username: this.state.username,
      password: this.state.password,
    };
    fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.token) {
          const token = user.token;
          localStorage.setItem("jwttoken", token);
          localStorage.setItem("username", user.user);

          this.props.history.push("/sell");
          window.location.reload();
        } else {
          this.setState({ massage: user.massage });
        }
      });
  }
  render() {
    setAuthToken(localStorage.getItem("jwttoken"));
    if (localStorage.getItem("username")) {
      this.props.history.push("/sell");
    }
    return (
      <div>
        <Navbar />
        <Container>
          <div>
            <div className="loginpage">
              <div className="loginbox">
                <form onSubmit={this.handlesubmit}>
                  <label className="flashlogin">{this.state.massage}</label>
                  <br />
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
                  <button className="btn btn-primary btnn">Login</button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Login;
