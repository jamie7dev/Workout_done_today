import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { __getUsername } from "../../redux/modules/signUp";


const Form = () => {
    const dispatch = useDispatch();
    const timestamp = new Date().getTime();

    const [input, setInput] = useState({
        username: "",
        password: "",
        passwordConfirm: ""
    });

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
   

//유효성 체크    
    const onChangeUsername = (e) => {
        const userIdRegex = /^[A-Za-z0-9+]{5,}$/;
        if ((!e.target.value || (userIdRegex.test(e.target.value)))) setUsernameError(false);
        else setUsernameError(true);
        // setInput(e.target.value);
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    const onChangePassword = (e) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if ((!e.target.value || (passwordRegex.test(e.target.value)))) setPasswordError(false);
        else setPasswordError(true);

        if (!input.passwordConfirm || e.target.value === input.passwordConfirm) setPasswordConfirmError(false);
        else setPasswordConfirmError(true);
        // setInput(e.target.value);
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    const onChangePasswordConfirm = (e) => {
        if (input.password === e.target.value) setPasswordConfirmError(false);
        else setPasswordConfirmError(true);
        // setPasswordConfirmError(e.target.value);
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    //유효성 검사
    const validation = () => {
        if(!input.username) setUsernameError(true);
        if(!input.password) setPasswordError(true);
        if(!input.passwordConfirm) setPasswordConfirmError(true);

        if(input.username && input.password && input.passwordConfirm) return true;
        else return false;
    }


    
    //회원가입 버튼 누르면 실행
    const addHandler = () => {
        const { username, password } = input;
        const user = {
            id: +timestamp,
            username: username,
            password: password
        };
        axios.post("http://localhost:3001/data", user);
        if(validation()) return;
    };
    
    useEffect(() => {
        dispatch(__getUsername());
      }, [dispatch]);
    


    return (
        <ContainerWrap>
            <StTitle>
                운동을 시작해보자구,  동지!!!
            </StTitle>
            <StForm>
                <InputWrap >
                    <StLabel>아이디</StLabel>
                    <StInputId placeholder="username를 입력하세요."
                        onChange={onChangeUsername}
                        type="text"
                        name="username"
                        id="username"
                        value={input.username} />
                        {usernameError && 
                        <div className="invalid-input">* 아이디는 영어와 숫자로 4자이상 8자 이하로 입력해주세요. *</div>}
                    <StButton>중복확인</StButton>
                </InputWrap>
                <StSmallLabel>* 아이디는 영어와 숫자로 4자이상 8자 이하로 입력해주세요. *</StSmallLabel>

                <InputWrap >
                    <StLabel >비밀번호</StLabel>
                    <StInput placeholder="password를 입력하세요."
                        onChange={onChangePassword}
                        type="password"
                        name="password"
                        id="password"
                        value={input.password} />
                        {passwordError && 
                        <div className="invalid-input">* 비밀번호는 영어, 숫자 포함 8자이상 20자이하로 입력해주세요 * </div>}
                </InputWrap>
                <StSmallLabel style={{ marginLeft: "50px" }}>* 비밀번호는 영어, 숫자 포함 8자이상 20자이하로 입력해주세요 *</StSmallLabel>
                <InputWrap >
                    <StLabel>비밀번호 재확인</StLabel>
                    <StInput placeholder="passwordConfirm."
                        onChange={onChangePasswordConfirm}
                        type="password"
                        name="passwordConfirm"
                        id="passWordConfirm"
                        value={input.passwordConfirm} />
                        {passwordConfirmError && 
                        <div className="invalid-input">비밀번호가 일치하지 않습니다.</div>}
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

const ContainerWrap = styled.div`
    text-align: center;
    margin: auto;
`;

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

const InputWrap = styled.div`
  width: 100%;
  border: none;
  border-radius: 8px;
  margin: 1.5% auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StLabel = styled.label`
  width: 10vw;
  min-width: 70px;
  height: 30px;
  margin-right: 1.5%;
  padding: 2%;
  display: flex;
  align-items: center;
  justify-content: right;
  border-radius: 8px;    
  font-weight: bolder;
`;

const StInputId = styled.input`
  width: 32%;
  padding: 12px;
  border: none;
  border-radius: 8px; 
  height: 30px; 
  background-color: whitesmoke;
`;

const StInput = styled.input`
  width: 40%;
  padding: 12px;
  border: none;
  border-radius: 8px; 
  height: 30px;
  background-color: whitesmoke;
`;



const StButton = styled.button`
  background-color: #4B89DC;
  border:none;
  border-radius: 5px;
  padding: 5px;
  margin: 0 0 0 38px;
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