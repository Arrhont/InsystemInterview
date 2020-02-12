import React from 'react';

export default function GoodRecord(props) {
    const { good, addToCart } = props;
  return (
    <div key={good.id}>
      {good.name} Осталось: {good.quantity} Цена: {good.priceUsd}$
      <div>
        {/* <input type="number" defaultValue="1" id={index}></input> */}
        <button
          disabled={good.quantity <= 0}
          onClick={event => {
            addToCart(good.id);
          }}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}
