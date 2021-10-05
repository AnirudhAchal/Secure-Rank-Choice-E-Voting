import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles/Login.css";
import { Link } from "react-router-dom";

class LoginView extends Component {
  render() {
    const {
      email,
      password,
      onSubmit,
      onEmailChange,
      onPasswordChange,
      validateForm,
    } = this.props;

    return (
      <div className="Login">
        <Form onSubmit={onSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="login">
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Login
            </Button>
          </Form.Group>
          <Form.Group size="lg" controlId="register" center>
            <Form.Label>Don't have an account?&nbsp;</Form.Label>
            <Link to="/register">Register</Link>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default LoginView;
