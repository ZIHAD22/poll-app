import React, { Component } from "react";
import shortid from "shortid";

// custom components for app
import MyForm from "./form";

const defaultOptions = [
  { id: shortid.generate(), value: "", vote: 0 },
  { id: shortid.generate(), value: "", vote: 0 },
  { id: shortid.generate(), value: "", vote: 0 },
];

class PollForm extends Component {
  state = {
    title: "",
    description: "",
    options: defaultOptions,
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleOptionChange = (event, index) => {
    const options = [...this.state.options];
    options[index].value = event.target.value;
    this.setState({ options });
  };

  createOption = () => {
    const { options } = this.state;
    if (options.length < 5) {
      options.push({
        id: shortid.generate(),
        value: "",
        vote: 0,
      });
      this.setState({ options });
    } else {
      alert("You Can Create Max 5 Options");
    }
  };

  deleteOption = (index) => {
    const { options } = this.state;
    if (options.length > 2) {
      options.splice(index, 1);
      this.setState({ options });
    } else {
      alert("You must Have at least two options ");
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, errors } = this.validate();
    if (isValid) {
      const { title, description, options } = this.state;
      this.props.submit({
        title,
        description,
        options,
      });
      event.target.reset();
      this.setState({
        title: "",
        description: "",
        options: defaultOptions,
        errors: {},
      });
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    let errors = {};
    const { title, description, options } = this.state;

    if (!title) {
      errors.title = "Please Provide Your Title";
    } else if (title.length < 20) {
      errors.title = "Your Title is Too Short";
    } else if (title.length > 100) {
      errors.title = "Your Title Is Long";
    }

    if (!description) {
      errors.description = "Please Provide a Description under 500 words";
    } else if (description.length > 500) {
      errors.description = "Your description is too Long";
    } else if (description.length < 10) {
      errors.description = "Your description is too short";
    }

    let optionErrors = [];
    options.forEach((opt, index) => {
      if (opt.value) {
        optionErrors[index] = "Option text Empty";
      } else if (opt.value.length > 100) {
        optionErrors[index] = "Option text is too long ";
      }
    });

    if (optionErrors.length > 0) {
      errors.options = optionErrors;
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };
  render() {
    const { title, description, options, errors } = this.state;
    return (
      <MyForm
        title={title}
        description={description}
        options={options}
        buttonValue={this.props.buttonValue || "Create Poll"}
        errors={errors}
        handleChange={this.handleChange}
        handleOptionChange={this.handleOptionChange}
        createOption={this.createOption}
        deleteOption={this.deleteOption}
        handleSubmit={this.handleSubmit}
      />

      //   <h1>{title + description + options}</h1>
    );
  }
}

export default PollForm;
