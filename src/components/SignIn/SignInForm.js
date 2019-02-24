import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';
import {Form, Button, Icon} from "semantic-ui-react";

const StyledForm = styled(Form)`
  &&& {
    padding: 0;
  }
  &&& .icon {
    size: 100px;
  }
  &&& .input {
    border-top: 3px solid ${props => props.theme.green};
    border-right: 3px solid ${props => props.theme.green};
    border-bottom: 2px solid ${props => props.theme.green};
    border-left: 3px solid ${props => props.theme.green};
    border-radius: 5px;
    margin-bottom: 10px;
    margin-top: 12px;
  }
  &&& .ui.labeled.input:not([class*="corner labeled"]) .label:first-child + input {
    color: ${props => props.theme.blue};
    font-family: 'Roboto', 'sans-serif';
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 5px;
  }
  &&& .ui.button {
    border: 2px solid ${props => props.theme.orange};
    border-radius: 5px;
    font-size: 2em;
    font-family: 'Roboto','sans-serif';
    color: ${props => props.theme.white};
  }
`;

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  const hasError = (touched && error) ? 'has-danger' : '';
  return (
    <div className={`form-group ${hasError}`}>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched && error && <div className="form-control-feedback">{error}</div>}
      </div>
    </div>
  );
};

const renderErrors = (errors) => (
  <div className="alert alert-danger" role="alert">
    {errors.map((error, index) => <span key={index}>{error.value}</span>)}
  </div>
);

const SignInForm = props => {
  const { handleSubmit } = props;
  const errors = props.errors <= 0 ? null : renderErrors(props.errors);

  return (
    <form onSubmit={handleSubmit}>
      {errors}
      <Field name="email" type="email" component={renderField} label="Email" />
      <Field name="password" type="password" component={renderField} label="Password" />
      <button type="submit" className="btn btn-primary">Sign in</button>
    </form>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.login) {
    errors.login = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)) {
    errors.login = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length <= 7) {
    errors.password = 'Must be at least 7 characters';
  }

  return errors;
};

export default reduxForm({
  form: 'SignInForm',
  validate
})(SignInForm);
