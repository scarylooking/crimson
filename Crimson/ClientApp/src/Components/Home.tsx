import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Container, Row, Col, Button } from 'react-bootstrap';


import diceBackground from '../Images/dice.jpg';

const Home: React.FunctionComponent = () => (
  <Container>
    <Row>
      <Col xs="4">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={diceBackground} />
          <Card.Body>
            <Card.Title>Group Dice</Card.Title>
            <Card.Text>
              Interactively roll dice with others.
            </Card.Text>
            <LinkContainer to="/dice">
              <div className="d-grid gap-2">
                <Button variant="primary">Go</Button>
              </div>
            </LinkContainer>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container >
);

export default Home;
