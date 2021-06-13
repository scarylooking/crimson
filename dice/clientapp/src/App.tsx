import * as React from 'react';
import { Route } from 'react-router';
import Layout from './Components/Layout';
import Home from './Components/Home';
import DiceRoll from './Components/DiceRoll/DiceRoll';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/dice' component={DiceRoll} />
    </Layout>
);
