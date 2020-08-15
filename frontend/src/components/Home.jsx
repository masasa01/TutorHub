import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
const networkPhoto = require('./pics/network-photo-1.jpg');
const excellencePhoto = require('./pics/test-photo-1.jpg');
const tutoringPhoto = require('./pics/tutoring-photo-1.jpg')


class About extends Component {
    render() {
        return(
            <div>
                <h1>Tutor Hub</h1>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="l-block w-100"
                        src={excellencePhoto}
                        alt="We strive in exellence"
                        />
                        <Carousel.Caption>
                        <h3 className="text-body">World Class tutors</h3>
                        <p className="text-body">Our Tutors are committed to helping you succeed.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="l-block w-100"
                        src={networkPhoto}
                        alt="A massive network"
                        />

                        <Carousel.Caption>
                        <h3 className="text-body">We have tutors from all over the country</h3>
                        <p className="text-body">We recruit tutors from all over the country, to help you be at your best wherever you are.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="l-block w-100"
                        src={tutoringPhoto}
                        alt="Guaranteed Success"
                        />

                        <Carousel.Caption>
                        <h3 className="text-body">Tutee Results</h3>
                        <p className="text-body">Our tutees report high success rates in tough courses like the IB program.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}

const Row = props => (
    <tr>
       <td>{props.row.subject}</td>
       <td>{props.row.location}</td>
       <td>{props.row.time}</td>
    </tr>
 )
 
 class TableComponent extends Component {
 
    constructor(props) {
       super(props);
 
       this.state = {tutors: []};
    }
 
    componentDidMount() {
       axios.get('/api/tutorInfo')
          .then(response => {
             this.setState({ tutors: response.data })
          })
          .catch((error) => {
             console.log(error);
          })
    }
 
    rowGenerator() {
       return this.state.tutors.map((currentRow, index) => {
          return <Row row={currentRow} key={index} />;
       })
    }
 
    render() {
       return (
          <div>
             <h3>Tutoring opportunities currently available</h3>
             <Table>
                <thead>
                   <tr>
                      <th>Subject</th>
                      <th>Location</th>
                      <th>Time</th>
                   </tr>
                </thead>
                <tbody>
                   { this.rowGenerator() }
                </tbody>
             </Table>
          </div>
       )
    }
 }

const Home = () => {
    
    return(
        <div>
            <About />
            <TableComponent />
        </div>
    )
}

export default Home;