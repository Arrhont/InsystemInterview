import React from 'react';

function ProductGroup(props) {
    return (
        <div className="ProductGroup">
            {props.groupName}
            {props.children}
        </div>
    )
}

export default ProductGroup;