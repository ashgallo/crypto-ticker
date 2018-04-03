import React, { Fragment } from 'react';
import CoinForm from './CoinForm';
import CoinList from './CoinList';

const Home = () => (
  <Fragment> 
    <CoinForm />
    <CoinList />
  </Fragment>
)

export default Home;

//fragment allows for side by side & doesn't appear in the dom