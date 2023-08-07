import './Button.css';
import React from 'react';
import {Link} from 'react-router-dom';

function Button(props){
    return(
        <button type={"button"} id={props.id}>
            {props.name}
        </button>
    )
}

export default Button;