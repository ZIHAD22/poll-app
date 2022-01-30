import React from "react";

import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";

const MyForm = ({
  title,
  description,
  options,
  errors,
  handleSubmit,
  buttonValue,
  handleChange,
  handleOptionChange,
  createOption,
  deleteOption,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          name="title"
          id="title"
          placeholder="Inter Your Title"
          value={title}
          onChange={handleChange}
          invalid={errors.title ? true : false}
        />

        {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          name="description"
          id="description"
          placeholder="Describe You Poll"
          value={description}
          onChange={handleChange}
          invalid={errors.description ? true : false}
        />

        {errors.description && (
          <FormFeedback>{errors.description}</FormFeedback>
        )}
      </FormGroup>

      <FormGroup>
        <Label>
          Enter Options
          <span
            style={{
              marginLeft: "30px",
              background: "green",
              color: "white",
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={createOption}
          >
            Add Option
          </span>
        </Label>

        {options.map((opt, index) => (
          <div key={opt.id} className="d-flex my-2">
            <Input
              value={opt.value}
              onChange={(e) => handleOptionChange(e, index)}
              invalid={errors.options && errors.options[index] ? true : false}
            />
            <Button
              color="danger"
              disabled={options.length <= 2}
              className="ms-2"
              onClick={() => deleteOption(index)}
            >
              Delete
            </Button>
          </div>
        ))}
      </FormGroup>
      <Button color="primary" type="submit">
        {buttonValue}
      </Button>
    </Form>
  );
};

export default MyForm;
