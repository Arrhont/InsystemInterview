import React from 'react';
import GroupContent from './GroupContent';

function ProductGroup(props) {
    return (
        <div>
            {props.groupName} {props.id}
            <GroupContent
                content={props.content}
                exchangeRate={props.exchangeRate}
            />
        </div>
    )
}

export default ProductGroup;