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
          onClick={(event) => {
            this.props.removeFromCart(
              this.props.goodId,
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