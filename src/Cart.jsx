import React from 'react';
import CartRecord from './CartRecord';

function Cart(props) {
  return (
    <div>
      {props.cart.map((cartRecord, index) => (
        <CartRecord
          key={cartRecord.goodName}
          name={cartRecord.goodName}
          price={cartRecord.priceUsd}
          goodId={cartRecord.goodId}
          cartQuantity={cartRecord.quantity}
          exchangeRate={props.exchangeRate}
          removeFromCart={props.removeFromCart}
        />
      ))
      }
      {props.cart.length > 0 &&
        <div>
          Итого: {props.cart.reduce((acc, item) => acc + item.priceUsd * item.quantity * props.exchangeRate, 0)} руб.
      </div>}
    </div>

  )
}

export default Cart;