import React from 'react';
import GroupContent from './GroupContent';

function ProductGroup(props) {
    return (
        <div>
            {props.groupName} {props.id}
            <GroupContent
                className="Goods-group"
                content={props.content}
                exchangeRate={props.exchangeRate}
                addToCart={props.addToCart}
            />
        </div>
    )
}

export default ProductGroup;