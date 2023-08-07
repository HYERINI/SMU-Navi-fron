import React from 'react';
import styled from 'styled-components';

const NumberButton = styled.div`
  padding: 5px 10px;
  box-sizing: border-box;
  width: 40vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(0,0,0,0.75);
  border-radius: 20px;
  font-size: 14px;
`

const NumberText = styled.div`
  color: white;
  display: flex;
  align-items: center;
`

const Number = styled.div`
  background-color: white;
  width: 35px;
  height: 20px;
  border-radius: 20px;
  text-align: center;
`
export default function NumberInfoButton({ content, number }){
    return(
        <NumberButton>
            <NumberText>{content}</NumberText>
            <Number>{number}건</Number>
        </NumberButton>
    )
}