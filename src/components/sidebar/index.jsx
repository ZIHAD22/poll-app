import React, { Component } from "react";
import { Input, Button, Modal, ModalHeader, ModalBody } from "reactstrap";

// custom components
import PollList from "./poll_list";
import PollForm from "../poll-form";

class SideBar extends Component {
  state = {
    openModal: false,
  };
  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };
  render() {
    return (
      <div style={{ background: "#efefef", padding: "10px" }}>
        <div className="d-flex my-5">
          <div className="m-auto">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-xs-8 col-sm-8">
                <Input
                  type="search"
                  placeholder="Search"
                  onChange={(e) => this.props.handleSearch(e.target.value)}
                  value={this.props.searchTerm}
                />
              </div>
              <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                <Button
                  color="success"
                  className="ms-2"
                  onClick={this.toggleModal}
                >
                  New
                </Button>
              </div>
            </div>
            <h3>List of polls</h3>
            <hr />
            <PollList
              polls={this.props.polls}
              selectPoll={this.props.selectPoll}
            />
            <Modal
              isOpen={this.state.openModal}
              toggle={this.toggleModal}
              unmountOnClose={true}
            >
              <ModalHeader toggle={this.toggleModal}>
                Create A New Poll
              </ModalHeader>
              <ModalBody>
                <PollForm submit={this.props.addNewPoll} />
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
