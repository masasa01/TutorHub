import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";


class Profile extends Component {

    componentDidMount() {
        user = sessionStorage.getItem('user');

        axios.get('http://localhost:3001/api/userData?' + user)
            .then(response => {
                this.setState({ tutors: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
        }

    return (
        <Container className="mb-5">
        <Row className="align-items-center profile-header mb-5 text-center text-md-left">
            <Col md={2}>
            {/*<img
                src={}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />*/}
            </Col>
            <Col md>
            <h2>{user.name}</h2>
            <p className="lead text-muted">{user.email}</p>
            </Col>
        </Row>
        </Container>
        );
    };

export default Profile;