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
      }</div>
  )
}

export default Cart;