import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
import axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      proficiency: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const post = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        proficiency: this.state.proficiency
    }

    console.log(post);

    axios.post("/api/adduser", post)
        .then(() => {
          sessionStorage.setItem('user', post.username)
          window.location.href = "/dashboard";
        })
        .catch(error => console.log(error));
    
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <Form.Group controlId = "username">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type = "username"
              name = "username"
              placeholder = "username"
              value = {this.state.username}
              onChange = {this.handleChange}
              autoComplete = "Username"
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

          <Form.Group controlId = "email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete = "Email address"
              required
            />
          </Form.Group>

          <Form.Group controlId = "proficiency">
            <Form.Label>Proficiency</Form.Label>
            <Form.Control
              type="proficiency"
              name="proficiency"
              placeholder="Proficiency"
              value={this.state.proficiency}
              onChange={this.handleChange}
              autoComplete = "Subjects/topics you specialize in"
              required
            />
          </Form.Group>
          

          <Button variant="primary" type="submit">Sign Up</Button>
        </form>
      </div>
    );
  }
}
