import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Row = (props) => {
   
   function dropJob() {
      const post = {
         subject: props.row.subject,
         location: props.row.location,
         time: props.row.time,
         postingUser: props.row.postingUser,
         acceptingUser: sessionStorage.getItem('user')
      }

      axios.post("/api/dropJob", post)
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
       <td type='button' onClick={dropJob}><button>Drop Job</button></td>
    </tr>
   )
}
 
 class AcceptedJobs extends Component {
 
    constructor(props) {
       super(props);
 
       this.state = {tutors: []};

       this.removePost = this.removePost.bind(this);
    }
 
    componentDidMount() {
       const user = sessionStorage.getItem('user');
       axios.get('/api/accepted', 
       {params: {
         acceptingUser: user
       }})
          .then(response => {
             this.setState({ tutors: response.data })
          })
          .catch((error) => {
             console.log(error);
          })
    }

    removePost() {
        console.log("hello");
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

 export default AcceptedJobs;