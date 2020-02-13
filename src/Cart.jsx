import React from 'react';

function Cart(props) {
  const { cart, exchangeRate } = props;

  function getTotalPrice(cart) {
    return cart.reduce((acc, item) => acc + item.priceUsCents / 100 * item.quantity * exchangeRate, 0);
  }

  return (
    <div  className="CartList">
      {props.children}
      {cart.length > 0 &&
        <div className="Total">
          Итого: {getTotalPrice(cart)} руб.
      </div>}
    </div>

  )
}

export default Cart;