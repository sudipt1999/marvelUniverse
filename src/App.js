import React, { Component} from 'react';
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
    fetch(`http://gateway.marvel.com/v1/public/characters?ts=${this.state.timestamp}&apikey=${this.state.marvelapikey}&hash=${this.state.marvelapihash}`)
    .then(response => response.json())
    .then(res => {
      //console.log(res.data.results)
        this.setState({
          marvelCharacters : [...res.data.results],
          list : [...res.data.results],
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
      content = <div className="loader"></div>
    }else if(this.state.list.length > 0){
      content = this.state.list.map((character)=>{
        return (
        <div className="ch">
          <div className="ch-pic">
            <img src={character.thumbnail.path} />
          </div>
          <div className="ch-name">
            <p>{character.name}</p>
          </div>
        </div>
      )
      })
    }    

    return(
      <div className="main">
            <div className="row">
                <div className="searchBar">
                  <input className="searchBar" type="text" onChange={(e)=>this.searchNameHandler(e)} value={this.state.searchValue}></input>        
               </div>
            </div>
            <div className="row">
              <div className="scrollableArea">
                    {content}
              </div>
            </div>
      </div>
    )
  }





}

export default App;
