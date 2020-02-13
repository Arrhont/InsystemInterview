import React from 'react';

function CartRecord(props) {
  const {
    name,
    goodId,
    price,
    exchangeRate,
    quantity,
    inStock,
    groupName,
    addToCart,
    removeFromCart
  } = props;

  function defineNewValue (eventValue) {
    eventValue = eventValue - eventValue % 1;

    if (eventValue <= 0) {
      return 1;
    }

    if (eventValue > inStock) {
      return inStock;
    }

    return eventValue;
  }

  return (
    <div>
      {groupName}. {name}. Цена: {price * exchangeRate / 100} руб.
      <input
        type="number"
        value={quantity}
        onChange={(event) => {
          const newValue = defineNewValue(event.target.value);
          
          if (newValue > quantity) {
            addToCart(goodId, newValue - quantity);
          } else {
            removeFromCart(goodId, quantity - newValue);
          }

        }}
      ></input>  В наличии {inStock} шт.

      <button
        onClick={(event) => {
          removeFromCart(goodId, quantity);
        }}
      >
        Удалить
      </button>
    </div>
  );
}

export default CartRecord;
