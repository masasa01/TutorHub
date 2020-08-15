import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Row = (props) => {
   
   function acceptJob() {
      const post = {
         subject: props.row.subject,
         location: props.row.location,
         time: props.row.time,
         postingUser: props.row.postingUser,
         acceptingUser: sessionStorage.getItem('user')
      }

      axios.post("/api/acceptJob", post)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));

      window.location.reload(false);
   }

   return (
    <tr>
       <td>{props.row.subject}</td>
       <td>{props.row.location}</td>
       <td>{props.row.time}</td>
       <td>{props.row.postingUser}</td>
       <td type='button' onClick={acceptJob}><button>Accept Job</button></td>
    </tr>
   )
}
 
 class AvailableJobs extends Component {
 
    constructor(props) {
       super(props);
 
       this.state = {tutors: []};
    }
 
    componentDidMount() {
       const user = sessionStorage.getItem('user')
       axios.get('/api/available', {
          params: {
             postingUser: user
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
                      <th>User</th>
                      <th></th>
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

 export default AvailableJobs;