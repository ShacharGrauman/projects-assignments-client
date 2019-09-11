import React from 'react';


const InputErrors = (props) => {
    return (
        props.errors.map((error, i) => {
            return <span key={i} className="form-text text-danger">{error}</span>
        })
    );
}

export default InputErrors;