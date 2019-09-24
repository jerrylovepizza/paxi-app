import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';
import PopUpReply from "../../pages/PopUpReply";
import { List, ListItem } from "../List";
import API from "../../utils/API";
import "./style.css";

class Nav extends Component {
  state = {
    show: false,
    modalShow: false,
    user: null,
    message: [],
    redirectTo: null,
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleHide = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    const userInfo = sessionStorage.getItem("user");
    const userObj = JSON.parse(userInfo);
    if (userInfo) {
      this.setState({ user: userObj },
        // () => console.log("Nav welcome user: ", this.state.user.name)
        // () => console.log("message: ", this.state.user._id)
        () => this.findAllMsg()
      )
    };
  };

  findAllMsg() {
    API.findAllMsg(this.state.user._id)
      .then(res => {
        this.setState({ message: res.data.message },
          () => console.log("message: ", res.data)
        )
      })
      .catch(err => console.log(err))
  }

  removeMsgBtn = (msgId) => {
    API.removeMsgBtn(msgId)
      .then(res => console.log("removed message: ", res.data))
      // .then(res => alert(`Your message has removed!`))
      .catch(err => console.log(err));
  }

  userLogout = () => {
    API.userLogout()
      .then(res => {
        console.log("(Nav)logout response: %O", res.data);
        sessionStorage.removeItem("user")
        this.setState({ redirectTo: "/" })
      })
      .catch(err => console.log(err))
  }

  render(props) {
    let modalClose = () => this.setState({ modalShow: false });
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/profile" className="nav-link">PAXI &nbsp;&nbsp;</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/profile" className="nav-item nav-link active text-muted navLink"><i className="fas fa-home"></i>Home &nbsp;&nbsp;</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/customer" className="nav-item nav-link active text-muted navLink"><i className="fas fa-box-open"></i> Send Packs &nbsp; </Link>
            </li>
            <li className="nav-item">
              <Link to="/carrier" className="nav-item nav-link text-muted navLink"><i className="fas fa-car-side"></i> Become Carrier</Link>
            </li>
          </ul>
        </div>
        <div className="mx-auto order-0">
          <span className="mr-auto text-light">{this.props.page ? this.props.page : "Welcome"} </span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item my-auto">
              <i className="text-light">{this.state.user ? this.state.user.name : "Guest"} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</i>
            </li>
            <li className="nav-item">

              {/* ===================== check msg btn ====================== */}
              {/* ===== react bootstrap modal (click to check message) ===== */}
              <Button variant="dark" onClick={this.handleShow} >
                {/* ========= message numbers and animation effect ========= */}
                {this.state.message.length > 0
                  ? <span className="pulse"> {this.state.message.length}</span>
                  : console.log("no message")
                }
                {/* ========= message numbers and animation effect ========= */}
              </Button>
              <Modal
                show={this.state.show}
                onHide={this.handleHide}
                dialogClassName="modal-50w"
              >
                <Modal.Header closeButton>
                  <Modal.Title> message list </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* ========= customized components, not bootstrap ========= */}
                  <List>
                    {this.state.message
                      .map((message, index) => (
                        <ListItem key={index}>
                          <span>&#9993; {message.title} </span>
                          <span className="msgSize"> &#34; {message.content} &#34; </span>
                          <div className="msgSize"> by <i>{message.carrierid}</i> </div>


                          {/* ====================== reply msg btn ====================== */}
                          {/* ===== react bootstrap modal (click to pop-up window) ===== */}
                          <div className="reply-btn">
                            <ButtonToolbar>
                              <Button
                                variant="info btn-sm"
                                onClick={() =>
                                  this.setState({
                                    modalShow: true,
                                  })
                                }
                              > reply
                              </Button>
                              <PopUpReply
                                show={this.state.modalShow}
                                onHide={modalClose}
                                packid={message.packid}
                                userid={message.userid}
                                carrierid={message.carrierid}
                                loginid={this.state.user._id}
                              />
                            </ButtonToolbar>
                          </div>
                          {/* ==========================done============================ */}

                          {/* ====================== remove msg btn ====================== */}
                          {/* ===== react bootstrap modal (click to pop-up window) ===== */}
                          <div className="remove-btn">
                            <Button
                              variant="primary btn-sm"
                              onClick={() => this.removeMsgBtn(message._id)}
                            > X
                              </Button>
                          </div>
                          {/* ==========================done============================ */}
                        </ListItem>
                      ))
                    }
                  </List>
                  {/* ========= customized components, not bootstrap ========= */}
                </Modal.Body>
              </Modal>
              {/* ===== react bootstrap modal (click to check message) ===== */}
              {/* ========================================================== */}
            </li>
            <li className="nav-item">
              <h3><i className="text-light nav-user far fa-envelope"></i></h3>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary btn-sm mr-auto" onClick={this.userLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
}

export default Nav;
