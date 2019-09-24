import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import "./style.css";

class NoMatch extends Component {
  // state = {
  //   reload: false,
  // };

  // componentWillMount() {
  //   console.log("session check: ", sessionStorage.getItem("user"))
  //   const userInfo = sessionStorage.getItem("user");
  //   if (userInfo) {
  //     if (!this.state.reload) {
  //       window.location.reload();
  //       this.setState({ reload: true })
  //     }
  //   }
  // }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <div className="pg404" >
              <h1>404 Page Not Found</h1>
              <h1>
                <span role="img" aria-label="Face With Rolling Eyes Emoji">
                  🙄
              </span>
              </h1>
              <br />
              <br />
              <br />
              <Link to="/" className="btn btn-dark">Go back</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NoMatch;
