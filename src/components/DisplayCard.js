import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class DisplayCard extends Component {
  render() {
    const { item } = this.props;
    if (!item) return null;
    
    const { thumbnail, name} = this.props.item;
    if (!thumbnail) return null;

    return (
      <Card style={{ width: '18rem', margin: '20px 40px ' }}>
        <Card.Img
          variant="top"
          src={`${thumbnail.path}/standard_fantastic.${thumbnail.extension}`}
          alt={name}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default DisplayCard;
