import React, { Component } from "react";

// install react-bootstrap npm,
// for the bootstrap modal, we will import two parts:
// first is button to open popup window:
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
// second is customized component PopUp or whatever:
import PopUp from "./PopUp";
// codes in PopUp are also from react bootstrap.

import API from "../utils/API";
import Nav from "../components/Nav";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";
import "./style.css";

import ReactGoogleMaps from "./ReactGoogleMaps";

class Carrier extends Component {
  state = {
    modalShow: false,
    smShow: false,
    pack: [],
    carry: [],
    userId: null,
    mapBtnA: null,
    mapBtnB: null,
    currentpackid: null,
    currentpacktitle: null,
    currentpackuserid: null,

    lat: null,
    lng: null
  };

  // ======== html5 built-in getGeoLocation() to get current location ========
  // componentWillUpdate() {
  //   this.getGeoLocation()
  // };
  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }
      )
      console.log("current location: \n", this.state.lat, this.state.lng)
    }
  };
  // =========================================================================

  componentDidMount() {
    this.getGeoLocation();

    const userInfo = sessionStorage.getItem("user");
    const userObj = JSON.parse(userInfo);
    if (userInfo) {
      this.setState({ userId: userObj._id },
        () => {
          console.log("carrier userId: ", this.state.userId);
        }
      )
    };

    this.findUnpicked();
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  findUnpicked() {
    API.findUnpicked()
      .then(res => {
        this.setState({ pack: res.data });
        console.log("Carrier find unpicked: ", this.state.pack)
      })
      .catch(err => console.log(err));
  };

  pickBtnSubmit() {
    // if (prompt("Do you want to carry this pack? Input 'yes' or 'no'") === "yes") {
    console.log("carrier req userId:", this.state.userId, "\n carrier req packId:", this.state.currentpackid)
    API.updateCarrier(this.state.userId, this.state.currentpackid)
      .then(res => { console.log(res.data); this.componentDidMount() })
      .then(res => this.setState({ smShow: false }))
    // .catch(err => console.log(err));
    // 刷新 mount 中全部内容!!!
    // }
  }


  render() {
    let modalClose = () => this.setState({ modalShow: false });
    let smClose = () => this.setState({ smShow: false });
    return (
      <div>
        <Nav page="Carrier" />
        <Container fluid>
          <div className="proContainer">
            <Row>
              <Col size="md-5">
                <div className="h2">Waiting List<hr /></div>
                <div className="packList">
                  {this.state.pack.length ? (
                    <List>
                      {this.state.pack
                        .map((pack, index) => (
                          <ListItem key={index} children={pack}>
                            {/* <ListItem key={pack._id} children={pack}> */}
                            <h4 data-id={pack._id}>{pack.title}</h4>
                            <div>From: {pack.from} - To: {pack.to}</div>
                            <div>Sender ID: {pack.userId}</div>
                            <div>Receiver: {pack.receiver}</div>

                            <div>Package size: {pack.size}</div>
                            <div>Package weight: {pack.weight}</div>
                            <div>Shipping fee: $ {pack.fee}</div>
                            <div>Description: {pack.description}</div>
                            <img className="col-12 mx-auto img" alt="" src={pack.image ? pack.image : require('./pack.png')} />
                            {/* <MapBtn onClick={() => this.mapBtnSubmit(pack._id)} /> */}
                            {/* <MsgBtn onClick={() => this.msgBtnSubmit(pack._id)} /> */}
                            {/* <PickBtn onClick={() => this.pickBtnSubmit(pack._id)} /> */}


                            {/* ====================== pick it btn ====================== */}
                            {/* ===== react bootstrap modal (click to pop-up window) ===== */}
                            <div className="pick-btn">
                              <ButtonToolbar>
                                <Button
                                  variant="success"
                                  // onClick={() => this.setState({ smShow: true })}
                                  onClick={() =>
                                    this.setState({
                                      smShow: true,
                                      currentpackid: pack._id,
                                    })
                                  }
                                  disabled={(this.state.userId === pack.userId)}
                                >
                                  <span> Pick it </span>
                                </Button>
                                <Modal
                                  size="sm"
                                  show={this.state.smShow}
                                  onHide={smClose}
                                  aria-labelledby="example-modal-sizes-title-sm"
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-sm">
                                      Carrier Confirm
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    Would you like to pick this pack?
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <FormBtn
                                      onClick={() => this.pickBtnSubmit()}
                                      btncolor="btn btn-success"
                                    >
                                      Yes
                                  </FormBtn>
                                    <FormBtn
                                      onClick={() => this.setState({ smShow: false })}
                                      btncolor="btn btn-secondary"
                                    >
                                      No
                                  </FormBtn>
                                  </Modal.Footer>
                                </Modal>
                              </ButtonToolbar>
                            </div>
                            {/* ==========================done============================ */}

                            {/* ====================== send msg btn ====================== */}
                            {/* ===== react bootstrap modal (click to pop-up window) ===== */}
                            <div className="msg-btn">
                              <ButtonToolbar>
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    this.setState({
                                      modalShow: true,
                                      currentpackid: pack._id,
                                      currentpacktitle: pack.title,
                                      currentpackuserid:pack.userId
                                    })
                                  }
                                  disabled={(this.state.userId === pack.userId)}
                                >
                                  <span> Send Msg </span>
                                </Button>
                                <PopUp
                                  show={this.state.modalShow}
                                  onHide={modalClose}
                                  packid={this.state.currentpackid}
                                  packtitle={this.state.currentpacktitle}
                                  userid={this.state.currentpackuserid}
                                  carrierid={this.state.userId}
                                />
                              </ButtonToolbar>
                            </div>
                            {/* ==========================done============================ */}
                          </ListItem>
                        ))
                      }
                    </List>
                  ) : (
                      <h6> &nbsp; No shipping packages </h6>
                    )}
                </div>
              </Col>
              <Col size="md-6">
                <div className="mapContainer">
                  <div className="h3">Map Search</div>
                  {/* // // // // // // // //  */}
                  <ReactGoogleMaps
                    // key={}
                    lat={this.state.lat}
                    lng={this.state.lng}
                  />
                  {/* // // // // // // // //  */}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Carrier;
