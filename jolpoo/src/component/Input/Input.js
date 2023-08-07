import './Input.css';
import React from 'react';
function Input(props){
    return(
        <input type={props.type} id={props.id}/>
    )
}

export default Input;