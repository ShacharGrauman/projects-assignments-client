import React from 'react';

const DropDownsOptions = (props) => {
    return (
        <>
            <div className="dropdown mr-1 mt-2">
                <select className="btn btn-secondary dropdown-toggle" name={props.name}
                    onChange={props.onSelect} >
                    <option value="" key={props.name}>{props.name}</option>
                    {
                        props.items.map(item =>
                            <option value={item.id} key={item.name}>{item.name}</option>
                        )
                    }
                </select>
            </div>
        </>
    );
}

export default DropDownsOptions;