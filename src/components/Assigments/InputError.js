import React from 'react';


export default props=>(
    props.errors.map((error,i)=>{
        return <small key={i}  className="form-text text-danger mt-0">{error}</small>
    })
)