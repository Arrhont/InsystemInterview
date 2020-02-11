import React from 'react';

function GroupContent(props) {
  return (
    <div>
      {props.content.map((good, index) => 
        <div key={index} >
          {good.name} Осталось: {good.quantity} Цена: {good.priceUsd*props.exchangeRate} руб.
        </div>)}
    </div>
  )
}

export default GroupContent;