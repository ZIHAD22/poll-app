import React, { Component } from "react";
import shortid from "shortid";
import { Container, Row, Col } from "reactstrap";

// custom components
import MainContent from "./components/main-contant";
import SideBar from "./components/sidebar";

// Poll data
import POLLS from "./data/polls";

class App extends Component {
  state = {
    polls: [],
    selectedPoll: {},
    searchTerm: "",
  };

  // state poll fill by polls data
  componentDidMount() {
    this.setState({ polls: POLLS });
  }

  // add or create new poll for app
  addNewPoll = (poll) => {
    poll.id = shortid.generate();
    poll.created = new Date();
    poll.totalVote = 0;
    poll.opinions = [];

    this.setState({
      polls: this.state.polls.concat(poll),
    });
  };

  // update our poll
  updatePoll = (updatedPoll) => {
    const polls = [...this.state.polls];
    const poll = polls.find((poll) => poll.id === updatedPoll.id);

    poll.title = updatedPoll.title;
    poll.description = updatedPoll.description;
    poll.opinions = updatedPoll.opinions;

    this.setState({
      polls: polls,
    });
  };

  // deletedPoll for id
  deletedPoll = (pollId) => {
    const polls = this.state.polls.filter((poll) => poll.id !== pollId);
    this.setState({
      polls: polls,
      selectedPoll: {},
    });
  };

  // select poll function
  selectPoll = (pollId) => {
    const poll = this.state.find((p) => p.id === pollId);
    this.setState({
      selectedPoll: poll,
    });
  };

  // handle search
  handleSearch = (searchTerm) => {};
  render() {
    return (
      <Container>
        <Row className="mt-4">
          <Col lg={4}>
            <SideBar
              polls={this.state.polls}
              handleSearch={this.handleSearch}
              searchTerm={this.state.searchTerm}
              selectPoll={this.selectPoll}
              addNewPoll={this.addNewPoll}
            />
          </Col>
          <Col lg={8}>
            <MainContent />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
