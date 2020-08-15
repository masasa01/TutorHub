import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import PostObject from "./components/PostObject.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/SignUp.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Footer from "./components/Footer.jsx";


class App extends Component {

  render() {
      return (
        <Container>
          <Router>
            <header>
              <NavBar />
            </header>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/contact" component={Contact} />
              <Route path="/posts" component={PostObject} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
            <footer>
              <Footer />
            </footer>
          </Router>
        </Container>
      )
  }
}

export default App;
