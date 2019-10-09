import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CharactersPage from './components/CharactersPage';
import SeriesPage from './components/SeriesPage';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Router>
          <Container>
            <Navbar className="nav">
              <Navbar.Brand as={Link} to="/">
                Marvel Universe
              </Navbar.Brand>
              <Nav className="mr-auto">
                <NavItem eventkey={2} href="/characters">
                  <Nav.Link as={Link} to="/characters">
                    Characters
                  </Nav.Link>
                </NavItem>
                <NavItem eventkey={3} href="/characters">
                  <Nav.Link as={Link} to="/series">
                    Series
                  </Nav.Link>
                </NavItem>
              </Nav>
            </Navbar>
            <Switch>
              <Route exact path="/">
                <h1 style={{ color: 'white', margin: '20px 40px ' }}>Welcome to Marvel Universe!</h1>
              </Route>
              <Route path="/characters">
                <CharactersPage />
              </Route>
              <Route path="/series">
                <SeriesPage />
              </Route>
            </Switch>
            <div className="footer">
              <p>Made with &hearts;</p>
            </div>
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
