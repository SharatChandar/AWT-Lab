import React, { Component } from "react";
import "./pages.css";
import "./bootstrap.css";
import Navbar from "./navbar.js";
import { connect } from "react-redux";
import { getItemById } from "../actions/itemActions";
import { deleteItem } from "../actions/itemActions";
import Axios from "axios";
import { Container } from "reactstrap";
import setAuthToken from "./../actions/aaxios";
import Swal from "sweetalert2";

class Selling extends Component {
  state = {
    items: [
      {
        id: "",
        qta: "",
        price: 0,
      },
    ],
    tag: "",
  };

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
    this.setState({
      items: this.state.items.filter((ite) => ite.id !== id),
    });
  };

  onsell = () => {
    const items = {
      items: this.state.items,
      name: document.getElementById("cust_name").value,
      ph: document.getElementById("cust_ph").value,
    };
    Axios.post("/sell", items).then(() =>
      Swal.fire({
        title: "Sale Successful",
        icon: "success",
      }).then(() => window.location.reload())
    );
  };
  render() {
    setAuthToken(localStorage.getItem("jwttoken"));
    if (!localStorage.getItem("username")) {
      this.props.history.push("/");
      alert("please login....");
    }

    var total;
    this.state.items.map((item, index) => {
      if (index === 0) {
        total = 0;
      }
      total = total + item.price;
      return null;
    });

    const { getitemsbyid } = this.props.item;

    return (
      <div>
        <Navbar history={this.props.history} />
        <Container>
          <div className="sellingpage">
            <h1>Sell</h1>

            <div className="addingbox">
              <input
                type="text"
                placeholder="Enter Customer Name"
                id="cust_name"
              />
              <input
                type="text"
                placeholder="Enter Customer Phone"
                id="cust_ph"
              />

              <input
                type="text"
                ref="id"
                placeholder="Enter Product Id"
                className="iid"
                id="bbbbbb"
              />
              <div className="button_page_wrap ">
                <button
                  id="bbbb"
                  className="btn btn-success btnadd btn-sm button_page"
                  onClick={() => {
                    let tt = false;
                    const mid = {
                      id: this.refs.id.value,
                    };

                    this.state.items.map((item) => {
                      if (item.id === this.refs.id.value) {
                        tt = true;
                      }
                      return null;
                    });
                    if (tt === false) {
                      this.props.getItemById(
                        mid,
                        function (msg) {
                          this.setState({ tag: msg });
                          console.log(msg);

                          setTimeout(() => {
                            document.getElementById("bbbb").disabled = false;
                            document.getElementById("bbbbb").disabled = false;
                            document.getElementById("bbbbbb").disabled = false;
                            this.setState({ tag: "" });
                          }, 1000);
                        }.bind(this)
                      );
                      document.getElementById("bbbb").disabled = true;
                      document.getElementById("bbbbb").disabled = true;
                      document.getElementById("bbbbbb").disabled = true;
                    } else {
                      this.setState({ tag: "item already added....." });

                      setTimeout(() => {
                        document.getElementById("bbbb").disabled = false;
                        document.getElementById("bbbbb").disabled = false;
                        document.getElementById("bbbbbb").disabled = false;
                        this.setState({ tag: "" });
                      }, 1000);
                    }
                  }}
                >
                  Add
                </button>
                <button
                  id="bbbbb"
                  className="btn btn-success btnsave btn-sm button_page"
                  onClick={this.onsell}
                >
                  Sell
                </button>
              </div>
              <h5 className="totalprice">Total : {total}</h5>
              <br />
              <label id="flashnoitem">{this.state.tag}</label>
            </div>
            <br />
            <div className="tablehead">
              <h5 className="thcount">Count</h5>
              <h5 className="thid">Id</h5>
              <h5 className="thitem">Items</h5>
              <h5 className="thpriceone">Price for one</h5>
              <h5 className="thstockqta">Stock.Qta</h5>
              <h5 className="thqta">Qta</h5>
              <h5 className="thprice">Price</h5>
            </div>

            <ul className="ulselling">
              {getitemsbyid.map((item, index) => {
                if (item) {
                  return (
                    <div key={item.id}>
                      <br />
                      <br />
                      <li className="liitem">
                        <label className="slcount">{index + 1}</label>
                        <label className="slid">{item.id}</label>
                        <label className="slitem">{item.item}</label>
                        <label className="slprice">{item.price}</label>
                        <div>
                          {this.state.items.map((tem) => {
                            if (tem.id === item.id) {
                              return (
                                <div key={tem.id}>
                                  <label className="qtas">{tem.qta}</label>
                                  <label className="tqprice">
                                    {tem.qta * item.price}
                                  </label>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                        <div id={item.id}>
                          <input type="number" ref="qta" className="iqta" />
                          <button
                            className="btn btn-success btnqta btn-sm"
                            id={item.id}
                            onClick={() => {
                              const mitem = {
                                id: item.id,

                                qta: this.refs.qta.value,

                                price: this.refs.qta.value * item.price,
                              };
                              const nitem = this.state.items.push(mitem);
                              this.setState({ nitem });

                              const set = document.getElementById(item.id);
                              set.style.display = "none";
                              document.getElementById("bbbb").disabled = false;
                              document.getElementById("bbbbb").disabled = false;
                              document.getElementById(
                                "bbbbbb"
                              ).disabled = false;
                            }}
                          >
                            Add
                          </button>
                        </div>
                        <label className="slqta">{item.qta}</label>
                        <button
                          className="slremove btn btn-danger btn-sm"
                          ref={item.id}
                          onClick={this.onDeleteClick.bind(this, item.id)}
                        >
                          Remove
                        </button>
                      </li>
                    </div>
                  );
                } else {
                }
                return null;
              })}
            </ul>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItemById, deleteItem })(Selling);
