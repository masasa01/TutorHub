import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = { 
      email: this.state.email,
      password: this.state.password
    }

    const newUser = { 
      username: "",
      email: "",
      password: ""
    }

    axios.get("/api/userData", {
      params: {
        email: user.email,
        password: user.password
      }
    })
      .then(response => {
        newUser.username = response.data[0].username
        newUser.email = response.data[0].email
        sessionStorage.setItem('user', newUser.username)
        window.location.href = '/dashboard';
        
      })
      .catch((error) => {
        "Unable to verify user";
    })
    
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId = "email">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type = "email"
              name = "email"
              placeholder = "Email"
              value = {this.state.email}
              onChange = {this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId = "password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          

          <Button variant="primary" type="submit">Login</Button>
        </form>
      </div>
    );
  }
}
