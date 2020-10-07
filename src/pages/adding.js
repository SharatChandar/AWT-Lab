import React, { Component } from "react";
import "./pages.css";
import "./bootstrap.css";
import Navbar from "./navbar.js";
import { connect } from "react-redux";
import { addItems } from "../actions/itemActions";
import PropTypes from "prop-types";
import setAuthToken from "./../actions/aaxios";
import { Container } from "reactstrap";
import Swal from "sweetalert2";

class Adding extends Component {
  state = {
    items: [],
  };

  onsave = () => {
    this.state.items.map((item) => {
      this.props.addItems(item);
      return 0;
    });
    Swal.fire({
      title: "Stock Added",
      icon: "success",
    });
    this.setState({ items: [] });
  };

  //   onSubmit = (e) => {
  //   e.preventDefault();
  // const newitem = {
  //    id: this.state.id,
  //     item: this.state.item,
  //    qta: this.state.qta,
  //    price: this.state.price

  //  }
  //this.props.additem(newitem);
  // }

  render() {
    setAuthToken(localStorage.getItem("jwttoken"));
    if (!localStorage.getItem("username")) {
      this.props.history.push("/");
    }
    return (
      <div>
        <Navbar history={this.props.history} />
        <Container>
          <div className="addingpage ">
            <h1>Adding</h1>
            <div className="addingbox">
              <input
                placeholder="Id"
                type="text"
                ref="id"
                className="iid"
                onChange={this.onChange}
              />
              <input
                placeholder="Item"
                type="text"
                ref="item"
                className="iitem"
                onChange={this.onChange}
              />
              <input
                placeholder="Qta"
                type="number"
                ref="qta"
                className="aiqta"
                onChange={this.onChange}
              />
              <input
                placeholder="Price"
                type="number"
                ref="price"
                className="aiprice"
                onChange={this.onChange}
              />
              <button
                className="btn btn-success btnadd btn-sm button_page"
                onClick={() => {
                  const mitem = {
                    id: this.refs.id.value,
                    item: this.refs.item.value,
                    qta: this.refs.qta.value,
                    price: this.refs.price.value,
                  };
                  const nitem = this.state.items.push(mitem);
                  this.setState({ nitem });
                }}
              >
                Add
              </button>
              <button
                className="btn btn-success btnsave btn-sm button_page"
                onClick={this.onsave}
              >
                Save
              </button>
              <div className="table_wrapper">
                <div className="tablehead">
                  <h5 className="thcount">Count</h5>
                  <h5 className="thid">Id</h5>
                  <h5 className="thitem">Items</h5>
                  <h5 className="thpriceone">Price for one</h5>
                  <h5 className="thstockqta">Qta</h5>
                </div>

                <ul className="olselling">
                  {this.state.items.map((item, index) => {
                    return (
                      <div key={item.id}>
                        <br />

                        <li className="liitem">
                          <label className="adindex">{index + 1}</label>
                          <label className="slid">{item.id}</label>
                          <label className="slitem">{item.item}</label>
                          <label className="slqta">{item.qta}</label>
                          <label className="slprice">{item.price}</label>
                          <button
                            className="addremove btn btn-danger btn-sm"
                            onClick={() => {
                              this.setState({
                                items: this.state.items.filter(
                                  (ite) => ite.id !== item.id
                                ),
                              });
                            }}
                          >
                            Remove
                          </button>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
Adding.propTypes = {
  addItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItems })(Adding);
