import React from 'react';

function GroupContent(props) {
  return (
    <div>
      {props.content.map((good, index) => (
        <div key={index}>
          {good.name} Осталось: {good.quantity} Цена: {good.priceUsd}$
          <div>
            {/* <input type="number" defaultValue="1" id={index}></input> */}
            <button
              disabled={good.quantity <=0}
              name={good.name}
              onClick={(event) => {
                props.addToCart(event.target.name);
              }}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupContent;
