import { Component } from 'react';
import CardOnList from 'components/CardOnList/CardOnList';
import Header from 'components/Header/Header';
import filter from 'helpers/filter';
import { list } from 'constants'
import './style.scss';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProduct: list,
      copyAllProduct: list,
      valueBasket: 0,
    }
  }

  searchProduct = (searchText) => {
    const filtredArray = filter(this.state.allProduct, searchText);
    this.setState({copyAllProduct: filtredArray});
  }

  calculateValueBasket = (sign, price) => {
    switch (sign) {
      case "+":
        {
          this.setState(prevState => ({valueBasket: prevState.valueBasket + price}));
        }
        break;
      
      case "-":
        {
          this.setState(prevState => ({valueBasket: prevState.valueBasket - price}));
        }
        break;
    }
  }

  rememberCount = (id, count, amount) => {
    this.setState({
      allProduct: this.state.allProduct.map(elem => {
        if (elem.id === id) {
          elem.count = count;
          elem.amount = amount;
        }
        
        return elem;
      })
    });
  }

  render() {
    return (
      <div className="main">
        <Header searchProduct={this.searchProduct} valueBasket={this.state.valueBasket}/>
        <div className="main__cards">
          { this.state.copyAllProduct.length !== 0
            ? (this.state.copyAllProduct.map(product => 
              <CardOnList 
                {...product} 
                key={product.id} 
                calculateValueBasket={this.calculateValueBasket}
                rememberCount={this.rememberCount}
              />
              ))
            : (<h1>Product not found</h1>)
          }
        </div>
      </div>
    );
  }
}

export default Main;
