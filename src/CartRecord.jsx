import React from 'react';

class CartRecord extends React.Component {

  constructor(props) {
    super(props);
    this.state = { array: [] }
  }
  render() {
    return (
      <div>
        {this.props.name} {this.props.price * this.props.exchangeRate} {this.props.cartQuantity}
        <button
          name={this.props.name}
          onClick={(event) => {
            event.preventDefault();
            this.props.removeFromCart(
              event.target.name,
              this.props.cartQuantity);
          }}
        >
          Удалить
      </button>
      </div>
    )
  }
}

export default CartRecord;