import React from 'react';
import CartRecord from './CartRecord';

function Cart(props) {
  const { cart, exchangeRate} = props;
  return (
    <div>
      {cart.map((cartRecord, index) => (
        <CartRecord
          key={cartRecord.goodId}
          name={cartRecord.goodName}
          price={cartRecord.priceUsd}
          goodId={cartRecord.goodId}
          quantity={cartRecord.quantity}
          inStock={cartRecord.inStock}
          groupName={cartRecord.groupName}
          exchangeRate={props.exchangeRate}
          addToCart={props.addToCart}
          removeFromCart={props.removeFromCart}
        />
      ))
      }
      {cart.length > 0 &&
        <div>
          Итого: {cart.reduce((acc, item) => acc + item.priceUsd / 100 * item.quantity * exchangeRate, 0)} руб.
      </div>}
    </div>

  )
}

export default Cart;