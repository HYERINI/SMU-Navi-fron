import './Modal.css';
import React from 'react';
import Button from '../Button/Button';

function Modal(props){
    return(
        <div className={"modalBox"}>
            <p>{props.content}</p>
            <Button name={props.btName} url={props.Url}/>
        </div>
    )
}

export default Modal;