import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardImg, Container, Row, Col, Button } from 'reactstrap';


import diceBackground from '../Images/dice.jpg';

const Home: React.FunctionComponent = () => (
  <Container>
    <Row>
      <Col xs="4">
        <Card body>
          <CardImg top width="100%" src={diceBackground} alt="A variety of gaming dice spilling out from a pouch" />
          <CardTitle tag="h5">Group Dice</CardTitle>
          <CardText>Interactively roll dice with others.</CardText>
          <Button tag={Link} to="/dice" outline color="primary">Go</Button>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Home;
