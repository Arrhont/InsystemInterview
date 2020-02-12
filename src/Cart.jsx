import React from 'react';
import CartRecord from './CartRecord';

function Cart(props) {
  return (
    <div>
      {props.cart.map((cartRecord, index) => (
        <CartRecord
          key={index}
          name={cartRecord.productName}
          price={cartRecord.priceUsd}
          cartQuantity={cartRecord.quantity}
          groupId={cartRecord.groupId}

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