import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './DisplayCard.css'

class DisplayCard extends Component {
  render() {
    const { thumbnail, title } = this.props;
    if (!thumbnail) return null;

    return (
      <Card className="displayCard" >
        <Card.Img variant="top" src={`${thumbnail.path}/standard_fantastic.${thumbnail.extension}`} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default DisplayCard;
