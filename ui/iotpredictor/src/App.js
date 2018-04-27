import React, { Component } from "react";

import "./App.css";
import Header from "./Header";
import Graph from "./Graph";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Graph />
      </div>
    );
  }
}

export default App;
