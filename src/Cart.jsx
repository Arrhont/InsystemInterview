import React from 'react';

function Cart(props) {
  const { cart, exchangeRate } = props;

  function getTotalPrice(cart) {
    return cart.reduce((acc, item) => acc + item.priceUsCents / 100 * item.quantity * exchangeRate, 0);
  }

  return (
    <div>
      {props.children}
      {cart.length > 0 &&
        <div>
          Итого: {getTotalPrice(cart)} руб.
      </div>}
    </div>

  )
}

export default Cart;