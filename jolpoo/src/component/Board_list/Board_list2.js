import React from 'react';
import "./Board_list.css";
import heartLike from './../../img/heartTrue.png';
import heartHate from './../../img/heartFalse.png';

function Board_list2(props) {
    return (
        <div className="board_list_top_wrap">
            <div className="board_list_container">
                <span>{props.title}</span>
            </div>
            <div className="board_heart_wrap">
                <span>{props.posttime}</span>
                <div id="board_heart">
                    <img src={heartLike} />
                    <span>{props.heartLike}</span>
                </div>
                <div id="board_heart2">
                    <img src={heartHate} />
                    <span>{props.heartHate}</span>
                </div>
            </div>
        </div>
    );
}

export default Board_list2;
