import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";



const Form = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
        passwordConfirm: ""
    });

    const timestamp = new Date().getTime();

    const addHandler = () => {
        const { username, password } = input;
        const annoyance = {
            id: +timestamp,
            username: username,
            password: password
        };
        axios.post("http://localhost:3001/data", annoyance);
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };




    return (
        <ContainerWrap>
            <StTitle>
                운동을 시작해보자구,  동지!!!
            </StTitle>
            <StForm>
                <InputWrap >
                    <StLabel>아이디</StLabel>
                    <StInputId placeholder="아이디를 입력하세요."
                        onChange={inputHandler}
                        type="text"
                        name="username"
                        id="username"
                        value={input.username} />
                    <StButton>중복확인</StButton>
                </InputWrap>
                <StSmallLabel>* 아이디는 영어와 숫자로 6자이상 8자 이하로 입력해주세요. *</StSmallLabel>

                <InputWrap >
                    <StLabel >비밀번호</StLabel>
                    <StInput placeholder="비밀번호를 입력하세요."
                        onChange={inputHandler}
                        type="password"
                        name="password"
                        id="password"
                        value={input.password} />
                </InputWrap>
                <StSmallLabel style={{ marginLeft: "50px" }}>* 비밀번호는 영어, 숫자와 특수문자포함 8자이상 20자이하로 입력해주세요 *</StSmallLabel>
                <InputWrap >
                    <StLabel>비밀번호 재확인</StLabel>
                    <StInput placeholder="비밀번호를 재입력하세요."
                        onChange={inputHandler}
                        type="password"
                        name="passwordConfirm"
                        id="passWordConfirm"
                        value={input.passwordConfirm} />
                </InputWrap>
                <JoinBtn type="button"
                    onClick={() => { addHandler(); console.log(input); }}>
                    운동하러 가자
                </JoinBtn>
            </StForm>
        </ContainerWrap>
    );
};

export default Form;

const StTitle = styled.div`
    padding: 25px;
    font-size: 40px;
    width: 60%;
    text-align: center;
    border:2px solid #4B89DC;
    border-radius: 10px;
    font-weight: 550;
    margin-top: 80px;
    margin-left: auto;
    margin-right: auto;
`;

const ContainerWrap = styled.div`
    text-align: center;
    margin: auto;
`;


const StLabel = styled.label`
  width: 10vw;
  min-width: 70px;
  height: 30px;
  margin-right: 1.5%;
  padding: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;    
  font-weight: bolder;
`;

const StInputId = styled.input`
  width: 30%;
  padding: 12px;
  border: none;
  border-radius: 8px; 
  height: 40px; 
`;

const StInput = styled.input`
  width: 40%;
  padding: 12px;
  border: none;
  border-radius: 8px; 
  height: 40px;
`;

const InputWrap = styled.div`
  width: 95%;
  border: none;
  border-radius: 8px;
  margin: 1.5% auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StButton = styled.button`
  background-color: #4B89DC;
  border:none;
  border-radius: 5px;
`;

const StSmallLabel = styled.label`
  width:95%;
  font-size: 12px;
  color: #285999;
  font-weight: 600;
  height: 20vw;
`;

const JoinBtn = styled.button`
  width: 150px;
  height: 40px;
  margin-left: 10px;
  margin-top: 3%;

  font-size: 15px;
  background-color: #4B89DC;
  color: black;
  font-weight: 600;
  border-radius: 10px;
`;


const StForm = styled.form`
    
`;