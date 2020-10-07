import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

import Main from "./main.js";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Main />
        </div>
      </Provider>
    );
  }
}

export default App;
