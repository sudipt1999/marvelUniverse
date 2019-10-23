import React, { Component, Fragment } from 'react';
import { Row, Card } from 'react-bootstrap';

import { fetchCharacterById } from '../../api/character';
import DisplayCard from '../DisplayCard';

class CharacterProfile extends Component {
  state = {
    marvelCharacter: null,
    loading: true,
  };

  async componentDidMount() {
    await this.fetchInit();
  }

  toggleLoader = active => {
    this.setState({ loading: active });
  };

  fetchInit = async () => {
    this.toggleLoader(true);
    const marvelCharacter = await fetchCharacterById(1009664);
    console.log('marvelCharacter', marvelCharacter);
    this.toggleLoader(false);
    this.setState({ marvelCharacter: marvelCharacter.results[0] });
  };

  renderLoader() {
    const { loading } = this.state;

    if (!loading) return null;

    return (
      <div className="Loader">
        <div className="loader"></div>
      </div>
    );
  }

  renderCard() {
    const { marvelCharacter } = this.state;

    return (
      <DisplayCard thumbnail={marvelCharacter.thumbnail}
        title={marvelCharacter.name} />
    );
  }

  render() {
    const { character } = this.props;
    console.log('marvelCharacter', character);
    return (
      <Fragment>
        <Row className="Scrollable">
          <DisplayCard
            thumbnail={character.thumbnail}
            title={character.name}
          />
        </Row>
      </Fragment>
    );
  }
}

export default CharacterProfile;
