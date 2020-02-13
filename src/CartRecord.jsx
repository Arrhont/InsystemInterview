import React from 'react';

function CartRecord(props) {
  const {
    cartRecord: {
      groupName,
      goodName,
      priceUsCents,
      quantity,
      inStock,
      goodId
    },
    exchangeRate,
    addToCart,
    removeFromCart
  } = props;

  function getValidValue(eventValue) {
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
    <div className="GoodRecord GoodRecord_borderBottom">
      <div>
        {groupName}. {goodName}. Цена: {(priceUsCents * exchangeRate) / 100}{' '}
        руб. В наличии {inStock} шт.
      </div>
      <div>
        <input
          className="QuantityInput"
          type="number"
          value={quantity}
          onChange={event => {
            const validValue = getValidValue(event.target.value);

            if (validValue > quantity) {
              addToCart(goodId, validValue - quantity);
            } else {
              removeFromCart(goodId, quantity - validValue);
            }
          }}
        />
        <button onClick={() => removeFromCart(goodId, quantity)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default CartRecord;
