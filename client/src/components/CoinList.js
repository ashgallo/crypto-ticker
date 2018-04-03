import React from 'react'
import { connect } from 'react-redux'; //gets coins from redux
import { Table, Divider, Header, Button } from 'semantic-ui-react'; //want to display the coins in a talbe
import { Link } from 'react-router-dom'; //when you click on a coin, want to go to the historical data on a new page
import { getCoins } from '../actions/coins'; //get all the coins out of the db, then out of the redux store

//needs to be a class so that when componentDidMount, it will dispatch the getCoins action & will load them into the reudx store
class CoinList extends React.Component {
  state = { filter: 'priceSort', asc: 1 }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCoins())
    this.ticker = setInterval( () => {
      dispatch(getCoins())
    }, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  changeFilter = (filter) => {
    const { asc } = this.state;
    if (filter === this.state.filter)
      this.setState({ filter, asc: -asc })
    else
      this.setState({ filter });
  }

  priceSort = (x,y) => {
    const { asc } = this.state
    if (x.price < y.price )
      return asc
    if (x.price > y.price )
      return - asc
    return 0
  }

  nameSort = (x,y) => {
    const { asc } = this.state
    if (x.name < y.name )
      return asc
    if (x.name > y.name )
      return - asc
    return 0
  }

  symbSort = (x,y) => {
    const { asc } = this.state
    if (x.symbol < y.symbol )
      return asc
    if (x.symbol > y.symbol )
      return - asc
    return 0
  }

  getSort = () => {
    return this[this.state.filter]
  }

//render will grab the coins out of props.  
  render() {
    const { coins } = this.props;
    return (
      <div>
        <Divider />
        <Button onClick={ () => this.changeFilter('priceSort') }>
          Price
        </Button>
        <Button onClick={ () => this.changeFilter('nameSort') }>
          Name
        </Button>
        <Button onClick={ () => this.changeFilter('symbSort') }>
          Symbol
        </Button>
        <Table celled striped>
          <Table.Header>
            { ['Symbol', 'Name', 'Price']
                .map( h =>
                  <Table.HeaderCell key={h}>
                    {h}
                  </Table.HeaderCell>
                )
            }
          </Table.Header>
          <Table.Body>
            { coins.sort(this.getSort()).map( coin => {
                const { price, name, symbol, id, cmc_id } = coin
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <Link to={`/coins/${cmc_id}`}>
                        { symbol }
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      { name }
                    </Table.Cell>
                    <Table.Cell>
                      ${ price }
                    </Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
  }

const mapStateToProps = (state) => {
return { coins: state.coins }
}

export default connect(mapStateToProps)(CoinList);