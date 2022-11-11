import { Component } from 'react';
import { imageHeader } from 'constants';
import './style.scss';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
    }
  }

  changeSearchInput = (e) => {
    this.setState({searchText: e.target.value})
  }

  render() {
    return (
      <div className="header">
        <img src={imageHeader} alt="Logo" className="header__image"/>
        <input
          className="header__input" 
          type="text"
          value={this.state.searchText}
          onChange={this.changeSearchInput}
          placeholder="Название товара"
        />
        <button 
          className="header__button"
          type="button"
          onClick={() => this.props.searchProduct(this.state.searchText)}
        >
          Поиск
        </button>
        <p>Общая стоимость выбранных товаров: {this.props.valueBasket} </p>
      </div>
    );
  }
}

export default Header;
