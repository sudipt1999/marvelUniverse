import React, {useState} from 'react';
import * as API from "../api/character";
import apiConfig from "../api/api-config";

const {Provider, Consumer} = React.createContext();

const CharacterProvider = ({children}) => {
  const [characters, setCharacters] = useState([]);
  const [characterPages, setCharacterPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCharactersPaginated = page => {
    setIsLoading(true);

    API.fetchCharactersPaginated(page)
      .then(apiData => {
        setCharacters(apiData.results);
        setCharacterPages(Math.ceil(apiData.total / apiConfig.perPage));
        setIsLoading(false);
      })
      .catch(error => {
        setCharacters([]);
        setIsLoading(false);
      });
  };

  const fetchCharactersByNamePaginated = (name, page) => {
    setIsLoading(true);

    API.fetchCharactersByNamePaginated(name, page)
      .then(apiData => {
        setCharacters(apiData.results);
        setCharacterPages(Math.ceil(apiData.total / apiConfig.perPage));
        setIsLoading(false);
      })
      .catch(error => {
        setCharacters([]);
        setIsLoading(false);
      });
  };

  return (
    <Provider value={{
      fetchCharactersPaginated,
      fetchCharactersByNamePaginated,
      characters,
      isLoading,
      characterPages
    }}>
      {children}
    </Provider>
  );
};

const withCharacters = Component => {
  return props => (
    <Consumer>
      {({
          fetchCharactersPaginated,
          fetchCharactersByNamePaginated,
          isLoading,
          characters,
          characterPages
        }) => (
        <Component {...props}
                   fetchCharactersPaginated={fetchCharactersPaginated}
                   isLoading={isLoading}
                   characters={characters}
                   characterPages={characterPages}
                   fetchCharactersByNamePaginated={fetchCharactersByNamePaginated}
        />
      )}
    </Consumer>
  );
};

export {
  CharacterProvider,
  Consumer as CharacterConsumer,
  withCharacters
};
