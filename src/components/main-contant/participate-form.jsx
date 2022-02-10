import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Button,
} from "reactstrap";

class ParticipateForm extends Component {
  state = {
    name: "",
    selectOption: "",
    errors: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { errors, isValid } = this.validate();
    const { name, selectOption } = this.state;
    if (isValid) {
      this.props.getOpinion({
        pollId: this.props.poll.id,
        name: name,
        selectOption: selectOption,
      });
      event.target.reset();
      this.setState({
        name: "",
        selectOption: "",
        errors: "",
      });
    } else {
      this.setState({
        errors,
      });
    }
  };

  validate = () => {
    let errors = {};
    const { name, selectOption } = this.state;

    if (!name) {
      errors.name = "Please Provide Your Name";
    } else if (name > 20) {
      errors.name = "Name length is too long";
    } else if (name < 5) {
      errors.name = "Name length is too short";
    }

    if (!selectOption) {
      errors.selectOption = "Please select a option";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="d-flex">
          <h4>Options</h4>
          <Button
            color="warning"
            type="button"
            className="ms-auto"
            onClick={this.props.toggleModal}
          >
            Edit
          </Button>

          <Button
            color="danger"
            className="ms-auto"
            onClick={() => this.props.deletePoll(this.props.poll.id)}
          >
            Delete
          </Button>
        </div>
        {this.props.poll.options.map((opt) => (
          <FormGroup className="my-2" key={opt.id}>
            <Label className="d-flex" id={opt.id}>
              <Input
                type="radio"
                id={opt.id}
                name="selectOption"
                value={opt.id}
                onChange={this.handleChange}
                invalid={this.state.selectOption ? true : false}
              />
              {opt.value}
              <span
                style={{
                  padding: "5px 20px",
                  background: "green",
                  color: "white",
                  borderRadius: "5px",
                }}
                className="ms-auto"
              >
                {opt.vote}
              </span>
              <span
                style={{
                  padding: "5px 20px",
                  backgroundColor: "orange",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                {this.props.poll.totalVote > 0
                  ? ((100 * opt.vote) / this.props.totalVote).toFixed(2)
                  : 0 + "%"}
              </span>
            </Label>
          </FormGroup>
        ))}
        <FormGroup>
          <Label>Enter Your Name</Label>
          <Input
            name="name"
            placeholder="MD.ZIHAD"
            value={this.state.name}
            onChange={this.handleChange}
            invalid={this.state.errors.name ? true : false}
          />
          {this.state.errors.name && (
            <FormFeedback>{this.state.errors.name}</FormFeedback>
          )}
        </FormGroup>
        <Button>Submit Your Opinion</Button>
      </Form>
    );
  }
}

export default ParticipateForm;
