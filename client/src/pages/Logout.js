import React, { Component } from "react";
import API from "../utils/API";
import "./style.css";

class Logout extends Component {

  componentDidMount() {
    this.logout();
  };

  logout = () => {
    API.logout()
    .then(console.log("logout"))
  };



  render() {
    return (
      <div></div>
    )
  }
}

export default Logout;
