import React, { Component} from 'react';
import { Button, Card, Col, Row, Container, InputGroup, FormControl } from 'react-bootstrap';
import './App.css';


class App extends Component{

  state = {
    marvelapikey : "3a6bbe839d07c15e01996061acd6a121",
    marvelapihash : "ac4ce3232a11197ececb965dcc3799d1",
    timestamp : 1,
    marvelCharacters : [],
    loading : true,
    searchValue: "",
    list: []
  }


  componentDidMount(){
    let list = []

    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
          list = [...res.data.results]
        console.log(this.state.marvelCharacters)
    });
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100&offset=200`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        list = list.concat(res.data.results)
        console.log(this.state.marvelCharacters)
    });
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100&offset=300`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        list = list.concat(res.data.results)
        console.log(this.state.marvelCharacters)
    });
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100&offset=400`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        list = list.concat(res.data.results)
        console.log(this.state.marvelCharacters)
    });
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100&offset=500`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        list = list.concat(res.data.results)
        console.log(this.state.marvelCharacters)
    });
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100&offset=600`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        list = list.concat(res.data.results)
        console.log(this.state.marvelCharacters)
    });
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100&offset=700`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        list = list.concat(res.data.results)
        console.log(this.state.marvelCharacters)
    });
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100&offset=800`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        list = list.concat(res.data.results)
        console.log(this.state.marvelCharacters)
    });
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100&offset=900`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        list = list.concat(res.data.results)
        console.log(this.state.marvelCharacters)
    });
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100&offset=1000`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        list = list.concat(res.data.results)
        console.log(this.state.marvelCharacters)
    });
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}&limit=100&offset=1100`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        list = list.concat(res.data.results)
        console.log("LIST>>>",list)
        this.setState({
          marvelCharacters : list,
          list : list ,
          loading : false
        })
        console.log(this.state.marvelCharacters)
    });
  }

  searchNameHandler = (e) => {
    if(e.value < 1)
      return
    let searchString = e.target.value
    let list = this.state.marvelCharacters.filter((ch)=>ch.name.includes(searchString))


    this.setState({
      searchValue: e.target.value,
      list : list
    })

  }

  render(){
    let content = [];
    if(this.state.loading){
      content = <div className="Loader"><div className="loader"></div></div>
    }else if(this.state.list.length > 0){
      content = this.state.list.map((character)=>{
        return (
          <Card style={{ width: '18rem', margin: '20px 40px ' }}>
          <Card.Img variant="top" src={character.thumbnail.path+"/standard_fantastic."+character.thumbnail.extension} alt="Character" />
          <Card.Body>
            <Card.Title>{character.name}</Card.Title>
            <Card.Text>
             
            </Card.Text>
          </Card.Body>
        </Card>
      )
      })
    }    

    return(
      <div className="main">
        <Container>
            <Row className="row">
                <div className="searchBar">
                <InputGroup size="lg" className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-lg">Search</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-label="Large" 
                               onChange={(e)=>this.searchNameHandler(e)} 
                               value={this.state.searchValue}
                               placeholder="Search Your Fav Character"
                               aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
               </div>
            </Row>
            <Row className="Scrollable">
                    {content}
            </Row>
            <div class="footer">
                <p>Made with &hearts;</p>
            </div>
          </Container>
      </div>
    )
  }





}

export default App;
