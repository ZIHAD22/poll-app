import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

// Custom component
import ParticipateForm from "./participate-form";
import PollForm from "../poll-form";

class MainContent extends Component {
  state = {
    openModal: false,
  };

  toggleModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };
  render() {
    if (Object.keys(this.props.poll).length === 0) {
      return (
        <div>
          <h3>Hi! I am zihad Welcome to My Application </h3>
          <p>
            You can create as many poll as you want. Click the new button to
            create a new poll. To check the status of a poll please select from
            the left sidebar. By selecting a poll you can check it's status,
            participate and opinion about the poll
          </p>
        </div>
      );
    }

    const { poll, getOpinion, updatePoll, deletedPoll } = this.props;

    return (
      <div>
        <h3>{poll.title}</h3>
        <p>{poll.description}</p>
        <br />
        <ParticipateForm
          poll={poll}
          getOpinion={getOpinion}
          toggleModal={this.toggleModal}
          deletePoll={deletedPoll}
        />
        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleModal}>Update Poll</ModalHeader>
          <ModalBody>
            <PollForm
              poll={poll}
              isUpdate={true}
              submit={updatePoll}
              buttonValue="Update Poll"
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default MainContent;
