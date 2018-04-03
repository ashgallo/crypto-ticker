import axios from 'axios';
//decide what you want this action to do
export const COINS = 'COINS';
export const ADD_COIN = 'ADD_COIN';
export const REMOVE_COIN = 'REMOVE_COIN';

//write out the functions for these actions

//get will have coins in the payload
//dispatch(getCoins())
//dispatch ({ type: 'TEST', payload: 'hello })
export const getCoins = () => {
  return (dispatch) => {
    axios.get('/api/coins')
      .then( ({ data: coins, headers }) => 
        dispatch({ type: COINS, coins, headers }) 
      )
  }
}

//add will have a single coin in the payload
//pass in paramenter in ()
export const addCoins = (coin) => {
  return (dispatch) => {
    axios.post('/api/coins', { coin })
      .then( ({ data: coin, headers }) => 
        dispatch({ type: ADD_COIN, coin, headers }) 
      )
  }
}

//remove will have a single id in the payload
export const removeCoins = (id) => {
  return (dispatch) => {
    axios.put(`/api/coins/${id}`)
      .then( ({ headers }) => 
        dispatch({ type: REMOVE_COIN, id, headers }) 
      )
  }
}


