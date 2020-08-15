import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>Tutor Hub</h1>
        </div>
        <div className="container-fluid">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <p>
              We are always happy to receive feedback from our users, whether
              you’re a tutee or a tutor. Please do not hesitate to contact us no
              matter the issue, positive or otherwise.
            </p>
            <br></br>
            <br></br>
            <address>
              <a href="mailto:tutorhub@tutorhub.com">tutorhub@tutorhub.com</a>
              <a href="tel:+13115552368">(311) 555-2368</a>
              <p>10 Water Street, Decorah, Iowa, 52101</p>
            </address>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    );
  }
}

export default Contact;