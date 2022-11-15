import { Component } from 'react';
import './style.scss'

class CardOnList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countOnBasket: this.props.count,
      amountOnStorage: this.props.amount,
    }
  }

  addProduct = async () => {
    await this.setState(prevState => (
      {
        countOnBasket: prevState.countOnBasket + 1,
        amountOnStorage: prevState.amountOnStorage - 1
      }
    ));
    this.props.calculateValueBasket("+", this.props.cost);
    this.props.rememberCount(this.props.id, this.state.countOnBasket, this.state.amountOnStorage);
  }

  deleteProduct = async () => {
    await this.setState(prevState => (
      {
        countOnBasket: prevState.countOnBasket - 1,
        amountOnStorage: prevState.amountOnStorage + 1
      }
    ));
    this.props.calculateValueBasket("-", this.props.cost);
    this.props.rememberCount(this.props.id, this.state.countOnBasket, this.state.amountOnStorage);
  }

  addProductInBasket = (e) => {
    e.stopPropagation();
    if (this.state.amountOnStorage > 0) {
      this.addProduct();
    }
  }

  deleteProductFromBasket = (e) => {
    e.stopPropagation();
    if (this.state.countOnBasket > 0) {
      this.deleteProduct();
    }
  }

  selectCard = () => {
    if (this.state.countOnBasket === 0) {
      this.addProduct();
    }

    if (this.state.countOnBasket === 1) {
      this.deleteProduct();
    }
  }

  render() {
    return (
      <div 
        className={this.state.countOnBasket > 0 ? "card card__select" : "card"}
        onClick={this.selectCard}
      >
        <img 
          src={this.props.imageUrl} 
          alt="Kartinka" 
          className="card__image" 
        />
        <h3 className="card__header">{this.props.title}</h3>
        <p className="card__text card__text_cost">Цена: {this.props.cost}</p>
        <p className="card__text card__text_amount">Кол-во: {this.state.amountOnStorage}</p>
        <span className="card__span">
          <button 
            type="button" 
            className="card__span_button card__span_button_decrement"
            onClick={this.deleteProductFromBasket}
          >
            -
          </button>
          <p className="card__span_count">{this.state.countOnBasket}</p>
          <button 
            type="button" 
            className="card__span_button card__span_button_increment"
            onClick={this.addProductInBasket}
          >
            +
          </button>
        </span>
      </div>
    );
  }
}

export default CardOnList;
