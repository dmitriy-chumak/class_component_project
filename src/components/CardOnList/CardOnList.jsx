import { Component } from 'react';
import './style.scss'

class CardOnList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      countPick: this.props.count,
      amount: this.props.amount,
    }
  }

  addProduct = async () => {
    await this.setState(prevState => ({countPick: prevState.countPick + 1}));
    await this.setState(prevState => ({amount: prevState.amount - 1}));
    this.props.calculateValueBasket(this.props.cost);
    this.props.rememberCount(this.props.id, this.state.countPick, this.state.amount);
  }

  deleteProduct = async () => {
    await this.setState(prevState => ({countPick: prevState.countPick - 1}));
    await this.setState(prevState => ({amount: prevState.amount + 1}));
    this.props.calculateValueBasket(-this.props.cost);
    this.props.rememberCount(this.props.id, this.state.countPick);
  }

  addProductInBasket = async (e) => {
    e.stopPropagation();
    if (this.state.amount > 0) {
      this.addProduct();
    }
  }

  deleteProductFromBasket = async (e) => {
    e.stopPropagation();
    if (this.state.countPick > 0) {
      this.deleteProduct();
    }
  }

  selectCard = () => {
    if (this.state.countPick === 0) {
      this.addProduct();
    }

    if (this.state.countPick === 1) {
      this.deleteProduct();
    }
  }

  render() {
    return (
      <div 
        className={this.state.countPick > 0 ? "card card__select" : "card"}
        onClick={this.selectCard}
      >
        <img 
          src={this.props.imageUrl} 
          alt="Kartinka" 
          className="card__image" 
        />
        <h3 className="card__header">{this.props.title}</h3>
        <p className="card__text card__text_cost">Цена: {this.props.cost}</p>
        <p className="card__text card__text_amount">Кол-во: {this.state.amount}</p>
        <span className="card__span">
          <button 
            type="button" 
            className="card__span_button card__span_button_decrement"
            onClick={(e) => this.deleteProductFromBasket(e)}
          >
            -
          </button>
          <p className="card__span_count">{this.state.countPick}</p>
          <button 
            type="button" 
            className="card__span_button card__span_button_increment"
            onClick={(e) => this.addProductInBasket(e)}
          >
            +
          </button>
        </span>
      </div>
    );
  }
}

export default CardOnList;
