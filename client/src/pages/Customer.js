import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Results from "../components/Results";
import Nav from "../components/Nav";
import { Col, Row, Container } from "../components/Grid";
import { Form, Input, FormBtn } from "../components/Form";
import "./style.css";
// import { relative } from "path";
class Customer extends Component {
  state = {
    title: "",
    from: "",
    to: "",
    size: "",
    weight: "",
    receiver: "",
    fee: "",
    image: "",
    description: "",
    userId: null,
    redirectTo: null,
  };

  componentDidMount() {
    const userInfo = sessionStorage.getItem("user");
    const userObj = JSON.parse(userInfo);
    if (userInfo) {
      this.setState({ userId: userObj._id },
        () => {
          console.log("customer userId: ", this.state.userId);
          //   this.findPacks();
          //   // this.findUser();
        }
      )
    };
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  createPackBtn() {
    API.createPackBtn(this.state)
      .then(res => console.log("response to customer: ", res.data))
      // .then(res => alert(`Your ${res.data.title} has posted!`))
      .then(res => this.setState({ redirectTo: "/carrier" }))
      // .then(res => window.location.replace("/carrier"))
      .catch(err => console.log(err));
  }

  render() {
    // if (this.state.redirectTo) {
    //   return <Redirect to={{ pathname: this.state.redirectTo }} />
    // }
    return (
      <div className="ship-pg">
        <Nav page="Shipping" />
        {this.state.redirectTo ? <Redirect to={{ pathname: this.state.redirectTo }} /> : console.log("no redirect")}
        <Container fluid>
          <div className="proContainer">
            <Row>
              <Col size="md-12">
                <Results>
                  <div className="h3">Start to Send your Package</div>
                  <Form>
                    <h5>Package Information</h5>
                    <span>What's your pack? (required)</span>
                    <Input
                      name="title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      placeholder="Enter your pack name"
                    />

                    <span>pack Size (required)</span>
                    <Input
                      name="size"
                      value={this.state.size}
                      onChange={this.handleInputChange}
                      placeholder="inch x inch"
                    />

                    <span>pack weight (required)</span>
                    <Input
                      name="weight"
                      value={this.state.weight}
                      onChange={this.handleInputChange}
                      placeholder="lbs"
                    />

                    <span>From (required)</span>
                    <Input
                      name="from"
                      value={this.state.from}
                      onChange={this.handleInputChange}
                      placeholder="street(apt#), city, state, zip"
                    />

                    <span>To (required)</span>
                    <Input
                      name="to"
                      value={this.state.to}
                      onChange={this.handleInputChange}
                      placeholder="street(apt#), city, state, zip"
                    />

                    <span>Receiver (required)</span>
                    <Input
                      name="receiver"
                      value={this.state.receiver}
                      onChange={this.handleInputChange}
                      placeholder="receiver's full name"
                    />

                    <div>Shipping Fee (required)</div>
                    <Input
                      name="fee"
                      value={this.state.fee}
                      onChange={this.handleInputChange}
                      placeholder="USD$"
                    />

                    <div>Image Link (optional)</div>
                    <Input
                      name="image"
                      value={this.state.image}
                      onChange={this.handleInputChange}
                      placeholder="image link"
                    />

                    <div>Description (optional)</div>
                    <Input
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      placeholder="Description"
                    />

                    <FormBtn
                      btncolor="btn btn-danger"
                      disabled={!(this.state.title && this.state.size && this.state.weight && this.state.from && this.state.to && this.state.receiver && this.state.fee)}
                      onClick={() => this.createPackBtn()}
                    >
                      <i className="fas fa-shipping-fast"> Submit</i>
                    </FormBtn>

                  </Form>
                </Results>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Customer;
