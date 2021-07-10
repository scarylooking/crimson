import * as React from 'react';
import { Route } from 'react-router';
import Layout from './Components/Layout';
import Home from './Components/Home';
import DiceRoll from './Components/DiceRoll/DiceRoll';
import DiceRollSessionBuilder from './Components/DiceRoll/DiceRollSessionBuilder';

import './custom.css';

const App: React.FunctionComponent = () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route exact path="/dice" component={DiceRollSessionBuilder} />
    <Route exact path="/dice/:sessionId" component={DiceRoll} />
  </Layout>
);

export default App;