import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

// custom components
import MainContant from "./components/main-contant";
import SideBar from "./components/sidebar";

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={4}>
            <SideBar />
          </Col>
          <Col lg={8}>
            <MainContant />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
