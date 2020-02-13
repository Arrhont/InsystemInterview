import React from 'react';

function CartRecord(props) {
  const {
    cartRecord: {
      groupName,
      goodName,
      priceUsCents,
      quantity,
      inStock,
      goodId,
    },
    exchangeRate,
    addToCart,
    removeFromCart,
  } = props;

  function getValidValue (eventValue) {
    eventValue = Math.floor(eventValue);

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
      {groupName}. {goodName}. Цена: {priceUsCents * exchangeRate / 100} руб.
      <input
        type="number"
        value={quantity}
        onChange={(event) => {
          const validValue = getValidValue(event.target.value);
          
          if (validValue > quantity) {
            addToCart(goodId, validValue - quantity);
          } else {
            removeFromCart(goodId, quantity - validValue);
          }
        }}
      />  В наличии {inStock} шт.

      <button
        onClick={() => removeFromCart(goodId, quantity)}
      >
        Удалить
      </button>
    </div>
  );
}

export default CartRecord;
