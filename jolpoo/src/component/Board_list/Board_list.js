import React from 'react';
import "./Board_list.css";
function Board_list(props) {
    return (
        <div className="board_list_container">
            <span>{props.title}</span>
            <span>{props.posttime}</span>
            {/*<span>글1</span>*/}
            {/*<span>글2</span>*/}
        </div>
    );
}

export default Board_list;
