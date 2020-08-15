import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Row = props => (
    <tr>
       <td>{props.row.subject}</td>
       <td>{props.row.location}</td>
       <td>{props.row.time}</td>
       <td>{props.row.postingUser}</td>
       <td>{props.row.acceptingUser}</td>
    </tr>
 )
 
 class PreviousJobs extends Component {
 
    constructor(props) {
       super(props);
 
       this.state = {tutors: []};
    }
 
    componentDidMount() {
       const user = sessionStorage.getItem('user'); 
       axios.get('/api/previous', {
          params: {
             postingUser: user,
             acceptingUser: user
          }
       })
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
             <Table>
                <thead>
                   <tr>
                      <th>Subject</th>
                      <th>Location</th>
                      <th>Time</th>
                      <th>Posting User</th>
                      <th>Accepting User</th>
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


export default PreviousJobs;