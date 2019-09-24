import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Carrier from "./pages/Carrier";
import Customer from "./pages/Customer";
// import NoMatch from "./pages/NoMatch";

class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    // console.log("React App session check: ", sessionStorage.getItem("user"))
    const userInfo = sessionStorage.getItem("user");
    if (userInfo) {
      this.setState({ user: userInfo },
        // () => console.log("React APP state check: ", this.state.user)
      )
    }
  }

  render() {
    return (
      <Router>
        {this.state.user ? this.loggedInRoutes() : this.loggedOutRoutes()}
      </Router>
    )
  }

  loggedInRoutes() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/carrier" component={Carrier} />
          <Redirect to={{ pathname: '/profile' }} />
          {/* <Route component={Profile} /> */}
          {/* <Route path="/profile/:id" component={Profile} /> */}
        </Switch>
      </div>
    )
  }

  loggedOutRoutes() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/carrier" component={Carrier} />
          <Redirect to={{ pathname: '/' }} />
        </Switch>
      </div>
    )
  }
}

export default App;
