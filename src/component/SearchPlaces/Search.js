import React, { useState, useCallback } from 'react'
import Address from './Address'
import './Search.css'

function Search() {
    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')

    const onChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(InputText)
        setInputText('')
    }

    const listVis = (e) => {
        document.getElementById("result-list").style.display = 'block';
    }

    const Clear = (e) => {
        document.getElementById("input").value = "";
    }


    return (
        <>
            <form id="inputForm" className="inputForm" onSubmit={handleSubmit} value="">
                <input id="input" placeholder="검색어를 입력하세요." onClick={Clear} onChange={onChange} value={InputText} />
                <button id="btnSub" type="submit" onClick={listVis}></button>
                <Address searchPlace={Place} />
            </form>

        </>
    )
}

export default Search