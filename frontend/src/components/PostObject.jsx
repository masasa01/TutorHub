import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class PostObject extends Component {
    constructor(props) {
        super(props);

        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            subject: "",
            location: "",
            time: ""
        }
    }

    onChangeSubject(event) {
        this.setState({
            subject: event.target.value
        })
    }

    onChangeLocation(event) {
        this.setState({
            location: event.target.value
        })
    }

    onChangeTime(event) {
        this.setState({
            time: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();

        const post = {
            subject: this.state.subject,
            location: this.state.location,
            time: this.state.time,
            postingUser: sessionStorage.getItem('user')
        }

        axios.post("/api/addjob", post)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
        
        window.location.href = "/dashboard";
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
            
            <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter subject"
                value={this.state.subject}
                onChange={this.onChangeSubject} />
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter location" 
                value={this.state.location}
                onChange={this.onChangeLocation}/>
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter your preferred time"
                value={this.state.time}
                onChange={this.onChangeTime} />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
            
            </form>
        )
    }
}
