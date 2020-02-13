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
    <div
      key={good.id}
      className="GoodRecord"
      style={backgroundColorSet(priceState)}
    >
      <div>
        <div className="GoodTextContainer GoodTextContainer_fontWeight_bold">{good.name}</div> 
        <div className="GoodTextContainer">Осталось: {good.quantity}</div>
        <div className="GoodTextContainer"> Цена: {good.priceUsCents / 100}$</div>
      </div>
      <div>
        <button
          className="AddButton"
          disabled={good.quantity <= 0}
          onClick={() => addToCart(good.id)}
        >
          Добавить<br/>в&nbsp;корзину
        </button>
      </div>
    </div>
  );
}
