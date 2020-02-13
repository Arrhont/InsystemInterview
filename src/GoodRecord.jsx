import React from 'react';

export default function GoodRecord(props) {
  const { good, addToCart, priceState } = props;

  function backgroundColorSet(priceState) {
    if (priceState === 'increased') {
      return { backgroundColor: 'red' };
    }
    if (priceState === 'decreased') {
      return { backgroundColor: 'green' };
    }
    return {};
  }

  return (
    <div key={good.id} style={backgroundColorSet(priceState)}>
      {good.name} Осталось: {good.quantity} Цена: {good.priceUsCents / 100}$
      <div>
        <button
          disabled={good.quantity <= 0}
          onClick={() => addToCart(good.id)}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}
