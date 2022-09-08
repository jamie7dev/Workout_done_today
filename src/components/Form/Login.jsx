import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  

  const initialState = {
    username: "",
    password: ""
  }

  const [inputValue, setInputValue] = useState(initialState);
  

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value })
  };

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    //빈값 체크
    if (inputValue.username === "" || inputValue.password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
    }

    try {
      // console.log(payload);
      const data =  await axios.post("http://3.38.192.170:8080/api/member/login", inputValue);
      localStorage.setItem("Authorization", data.headers.authorization)    //accesstoken
      localStorage.setItem("RefreshToken", data.headers.refreshtoken)   //refreshtoken 
      localStorage.setItem("username",data.data.data.username)
      console.log(data);
      navigate('/main');
      // if(data.data.success===false)
      //     alert("data.data.error.message");
          // alert("아이디와 비밀번호를 다시 확인해주세요.");
          // else alert("로그인 성공");
      // return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      alert("아이디와 비밀번호를 다시 확인해주세요.");
      // return thunkAPI.rejectWithValue(error);
    }
    
    console.log(inputValue);
    
  };
  

  return (
    <>
    <form onSubmit={onSubmitHandler}>
      <StLoginContainer>
        <ImgContainer/>            {/* 이미지 파일넣어서 배경넣음!! */}
        <StLoginBox>
          <StLoginHeader>
            <h1> 오늘 운동 완료했니? </h1>
          </StLoginHeader>
          <StLoginInputBox>
            <div className="username-box">
              <label htmlFor="username">username</label>
              <StLoginInput 
              type="text"
              name="username"
              value={inputValue.username}
              onChange={onChangeHandler}
              />
            </div>
            <div className="password-box">
              <label htmlFor="password">password</label>
              <StLoginInput 
              type="password"
              name="password"
              value={inputValue.password}
              onChange={onChangeHandler}
              />
            </div>
          </StLoginInputBox>
          <div>
            <StLoginBtn>로그인</StLoginBtn>
            <StLoginBtn onClick={()=>{navigate(`/form`)}}>회원가입</StLoginBtn>
          </div>
          
          </StLoginBox>
        </StLoginContainer>   
      </form>   
    </>
  );
 
};

export default Login;


//styled components

const StLoginContainer = styled.div`
width: 900px;
height: 600px;
margin: 200px auto;
`;
const ImgContainer = styled.div`
  background-image:url('https://ifh.cc/g/78Zfl5.png') ;
  width: 400px;
  height: 400px;
  background-size: cover;
  float: left;
`;

const StLoginBox = styled.div`
  background-color: white;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  border: 1px solid #4B89DC;
  color: #4B89DC;
  border-radius: 10px;
  line-height: 40px;
  float: right;
`;

const StLoginHeader = styled.div`
  background-color: #4B89DC;
  width: 100%;
  height: 100px;
  color: white;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  h1 {
    font-size: 40px;
    line-height: 50px;
  }
`;

const StLoginInputBox = styled.div`
margin-top: 30px;
`;

const StLoginInput = styled.input`
  font-size: 18px;
  padding: 4px;
  margin: 20px;
  width: 180px;
  background: white;
  border: 1px solid #4B89DC;
  border-radius: 3px;
`;

const StLoginBtn = styled.button`
  background-color: white;
  border: 1px solid #4B89DC;
  width: 100px;
  height: 38px;
  display: inline-block;
  margin: 40px 30px;
  border-radius: 4px;
  color: #4B89DC;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem; 
  &:hover{  
    background-color : #4B89DC;
    color : white;
  }
`;
