
import React, {useEffect, useState} from 'react';
import {Card, Container, FormControl, InputGroup, Row} from 'react-bootstrap';
import './App.css';
import Pagination from "./components/Pagination";
import {withCharacters} from "./context/CharacterContext";

const App = ({isLoading, characters, characterPages, fetchCharactersByNamePaginated, fetchCharactersPaginated}) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCharactersPaginated(1);
  }, []);

  let typingTimer;
  const TYPING_TIMEOUT = 1000;

  const searchNameHandler = (e) => {
    const targetValue = e.target.value;

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setSearchQuery(targetValue);
      if (!isLoading) {
        if (targetValue) {
          fetchCharactersByNamePaginated(targetValue, 1);
        } else {
          fetchCharactersPaginated(1);
        }
      }
    }, TYPING_TIMEOUT);
  };

  const onPageChanged = page => {
    if (searchQuery) {
      fetchCharactersByNamePaginated(searchQuery, page);
    } else {
      fetchCharactersPaginated(page);
    }
  };

  return (
    <div className="main">
      <Container>
        <Row className="row">
          <div className="searchBar" style={{width:'32%'}} >
            <InputGroup size="lg" className="mb-3 " >
              <InputGroup.Prepend >
                <InputGroup.Text  
                  style={{backgroundColor:'#2e86de',color:'whitesmoke',border:'1px solid #2e86de'}} 
                  id="inputGroup-sizing-lg"
                >
                  Search
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                style={{border:'2px solid #2e86de'}} 
                aria-label="Large"
                onChange={searchNameHandler}
                placeholder="Search Your Fav Character"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </div>
        </Row>
        <Pagination pages={characterPages} onPageChanged={onPageChanged}/>
        <Row className="Scrollable">
          {isLoading ? (
            <div className="Loader">
              <div className="loader"></div>
            </div>
          ) : characters.map(character => (
            <Card key={character.id} style={{width: '18rem', margin: '20px 40px '}}>
              <Card.Img variant="top"
                        src={character.thumbnail.path + "/standard_fantastic." + character.thumbnail.extension}
                        alt="Character"
              />
              <Card.Body>
                <Card.Title>{character.name}</Card.Title>
                <Card.Text>

                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
        <div className="footer">
          <p>Made with &hearts;</p>
        </div>
      </Container>
    </div>
  )
};

export default withCharacters(App);
