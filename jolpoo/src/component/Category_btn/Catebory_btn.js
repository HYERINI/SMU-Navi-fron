import React from 'react';
import './Catebory_btn.css';

function Catebory_btn(props){
    const { isSelected, handleClick, elementIndex } = props;
    return(
        <div className="Category_Button_List"
            onClick={() => handleClick(elementIndex)}
            style={isSelected ? { backgroundColor: 'white', color: props.backColor } : { backgroundColor: props.backColor, color: 'white' }}>
            {props.content}
        </div>
    )
}

export default Catebory_btn;