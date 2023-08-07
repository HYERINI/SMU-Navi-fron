import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #0B097A;
  justify-content: space-between;
  padding: 15px 10px;
  box-sizing: border-box;
`

const Input = styled.input`
  width: 80%;
  border: 0;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
`

const Button = styled.button`
  border: 0;
  background-color: #0B097A;
  color: white;
  font-weight: border;
  cursor: pointer;
`
export default function MobileMenuBar(){
    return(
        <Container>
            <Input type="text" placeholder="출발지를 입력하세요"></Input>
            <Button type="button">길찾기</Button>
        </Container>
    )
}