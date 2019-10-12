
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
  const TYPING_TIMEOUT = 3000;

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
        <Row className="row justify-content-center">
          <div className="searchBar">
            <InputGroup size="lg" className="mb-3">
              <FormControl className = "form-design"
                           aria-label="Large"
                           onChange={searchNameHandler}
                           placeholder="Search For Character You Love"
                           aria-describedby="inputGroup-sizing-sm"/>
            </InputGroup>
          </div>
        </Row>
        <Pagination pages={characterPages} onPageChanged={onPageChanged} className="pagination"/>
        <Row className="Scrollable">
          {isLoading ? (
            <div className="Loader">
              <div className="loader"></div>
            </div>
          ) : characters.map(character => (
            <Card key={character.id} className="displayCard">
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
