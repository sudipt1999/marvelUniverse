import React, { Component, Fragment } from 'react';
import { Row, InputGroup, FormControl } from 'react-bootstrap';

import getSeries from '../utils/getSeries';
import DisplayCard from './DisplayCard';
import './SeriesPage.css';

class SeriesPage extends Component {
  state = {
    marvelSeries: [],
    loading: true,
    searchValue: ''
  };

  async componentDidMount() {
    this.toggleLoader(true);
    await this.fetchInit();
    this.toggleLoader(false);
  }

  toggleLoader = active => {
    this.setState({ loading: active });
  };

  fetchInit = async () => {
    this.toggleLoader(true);
    const seriesList = await getSeries();
    this.toggleLoader(false);
    this.setState({ marvelSeries: seriesList });
  };

  handleSearchValueChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  filter = () => {
    const { marvelSeries, searchValue } = this.state;
    return searchValue.length === 0
      ? marvelSeries
      : marvelSeries.filter(
          char => char && char.name && char.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
        );
  };

  renderCards() {
    const { marvelSeries } = this.state;
    if (marvelSeries.length === 0) return [];
    const filteredList = this.filter();
    return filteredList.map(({ thumbnail, title }, i) => {
      return <DisplayCard key={i} thumbnail={thumbnail} title={title} />;
    });
  }

  renderLoader() {
    const { loading } = this.state;
    if (!loading) return null;
    return (
      <div className="Loader">
        <div className="loader"></div>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        <Row className="row">
          <div className="searchBar">
            <InputGroup size="lg" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">Search</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Large"
                onChange={e => this.handleSearchValueChange(e)}
                value={this.state.searchValue}
                placeholder="Search Your Fav Series"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
          </div>
        </Row>
        <Row className="Scrollable">
          {this.renderLoader()}
          {this.state.marvelSeries.length > 0 && this.renderCards()}
        </Row>
      </Fragment>
    );
  }
}

export default SeriesPage;
