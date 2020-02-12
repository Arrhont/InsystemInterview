import React from 'react';

function ProductGroup(props) {
    return (
        <div>
            {props.groupName} {props.id}
            {props.children}
        </div>
    )
}

export default ProductGroup;