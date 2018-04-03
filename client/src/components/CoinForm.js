import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCoin } from '../actions/coins.js';


//a form typicallly has a class and handleChange & handleSubmit events
class CoinForm extends React.Component {
  state = { coin: '' }

  //needs to udpate the state of coin to what the user is typing & needs to remove spaces & capitilizations of what the user typed
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value.toLowerCase().replace(' ', '') })
  }

//preventDefault prevents the browser from reloading. The value that is dispatched comes from state
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { coin } = this.state;
    dispatch(addCoin(coin))
    this.setState({ coin: '' }) //clear the form
  }

  //on submit, returns the form above
  render() {
    return (
      <Form onSubmit={this.handleSubmit}> 
        <Form.Input
          label="Watch Coin"
          value={this.state.coin}
          onChange={this.handleChange}
          name="coin"
          required
        />
        <Form.Button>Add Coin</Form.Button>
      </Form>
    )
  }
}

export default connect()(CoinForm);