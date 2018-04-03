//Will return things in the payload that get sent to us

import {
  COINS,
  ADD_COIN,
  REMOVE_COIN,
} from '../actions/coins';

const coins = (state = [], action) => {
  switch (action.type) {
    case COINS:
      //payload looks like { type: 'COINS', coins: [{...}, {...}] }
      return action.coins; 
    case ADD_COIN:
      //payload looks like { type: 'ADD_COIN', coin: {...} }
      return [...state, action.coin]
    case REMOVE_COIN:
      //payload looks like { type: 'REMOVE_COIN', id: 7 }
      return state.filter( c => c.id !== action.id )
    default: 
      return state
  }
}

export default coins;