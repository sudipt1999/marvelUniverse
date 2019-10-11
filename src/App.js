
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
       <h1 style={{textAlign: 'center'}}>MALVEL UNIVERSE</h1>
      <Container>
        <Row className="row justify-content-center">
          <div className="searchBar">
            <InputGroup size="lg" className="mb-3">
              <FormControl className = "form-design"
                           style={{width: '340px'}}
                           aria-label="Large"
                           onChange={searchNameHandler}
                           placeholder="Search For Character You Love"
                           aria-describedby="inputGroup-sizing-sm"/>
            </InputGroup>
          </div>
        </Row>
        
        <Row className="Scrollable">
          {isLoading ? (
            <div className="Loader">
              <div className="loader"></div>
            </div>
          ) : characters.map(character => (
            <Card className="pa3 " key={character.id} style={{width: '18rem', margin: '20px 40px '}}>
              <Card.Img variant="top"
                        src={character.thumbnail.path + "/standard_fantastic." + character.thumbnail.extension}
                        alt="Character"
              />
              <Card.Body>
                <Card.Title style={{color: "#fff", background: "#171515"}}>{character.name}</Card.Title>
                <Card.Text>

                </Card.Text>
              </Card.Body>
            </Card>
          ))}
           <Pagination pages={characterPages} onPageChanged={onPageChanged} className="pagination"/>
        </Row>
        <div className="footer">
          <p>Made with &hearts; Marvel</p>
        </div>
      </Container>
    </div>
  )
};

export default withCharacters(App);
