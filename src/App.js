import React, { Component } from 'react';
import { Card, Row, Container, InputGroup, FormControl } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingOverlay from 'react-loading-overlay';
import { PulseLoader } from 'react-spinners';

import './App.css';


class App extends Component {

  state = {
    marvelapikey: "3a6bbe839d07c15e01996061acd6a121",
    marvelapihash: "ac4ce3232a11197ececb965dcc3799d1",
    timestamp: 1,
    marvelCharacters: [],
    loading: true,
    hasMore: true,
    searchValue: "",
    list: []
  }


  componentDidMount() {
    let list = []
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100`)
      .then(response => response.json())
      .then(res => {
        //console.log(res.data.results)
        list = [...res.data.results]
        console.log("LIST>>>", list)
        this.setState((state) => {
          return {
            marvelCharacters: [...state.marvelCharacters, ...list],
            list: list,
            loading: false
          }
        })
        console.log(this.state.marvelCharacters)
      });
  }

  searchNameHandler = (e) => {
    if (e.value < 1)
      return
    let searchString = e.target.value
    let list = this.state.marvelCharacters.filter((ch) => ch.name.includes(searchString))


    this.setState({
      searchValue: e.target.value,
      list: list
    })

  }

  fetchMoreData = () => {
    if (
      this.state.list.length >= 1100 ||
      !this.state.list
    ) {
      this.setState({
        hasMore: false
      });
    } else if (this.state.list.length > 0) {
      this.setState({
        loading: true
      })
      const limit = 100;
      var offset = this.state.list.length + limit;
      let list = []
      fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=${limit}&offset=${offset}`)
        .then(response => response.json())
        .then(res => {
          //console.log(res.data.results)
          list = [...res.data.results]
          console.log("LIST>>>", list)
          this.setState((state) => {
            return {
              marvelCharacters: [...state.marvelCharacters, ...list],
              list: [...state.list, ...list],
              loading: false
            }
          })
          console.log(this.state.marvelCharacters)
        });
    }
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner={
          <PulseLoader
            color="silver"
            size={40}
          />
        }
      >
        <div className="main">
          <Container>
            <Row className="row">
              <div className="searchBar">
                <InputGroup size="lg" className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-lg">Search</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-label="Large"
                    onChange={(e) => this.searchNameHandler(e)}
                    value={this.state.searchValue}
                    placeholder="Search Your Fav Character"
                    aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
              </div>
            </Row>
            <Row className="Scrollable" id="scrollableContent">
              <InfiniteScroll
                dataLength={this.state.list.length} //This is important field to render the next data
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scrollableContent"
              >
                {
                  this.state.list.map((character, index) => {
                    return (
                      <div class="card-wrapper">
                      <Card key={index}>
                        <Card.Img variant="top" src={character.thumbnail.path + "/standard_fantastic." + character.thumbnail.extension} alt="Character" />
                        <Card.Body>
                          <Card.Title>{character.name}</Card.Title>
                          <Card.Text>

                          </Card.Text>
                        </Card.Body>
                      </Card>
                      </div>
                    )
                  })}
              </InfiniteScroll>
            </Row>
            <div className="footer">
              <p>Made with &hearts;</p>
            </div>
          </Container>
        </div>
      </LoadingOverlay>
    )
  }
}

export default App;
