import React from 'react';

const DropDownsOptions = (props) => {
    return (
        <>
            <div className="dropdown mr-1 mt-2">
                <select className="btn btn-secondary dropdown-toggle" name="roles" >
                    <option value="">{props.name}</option>
                    {
                        props.context.map(item =>
                            <option value={item.id}>{item.name}</option>
                        )
                    }
                </select>
            </div>
        </>
    );
}

export default DropDownsOptions;