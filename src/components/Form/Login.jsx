import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    username: "",
    password: ""
  })

  const inputChangeHandler = (event) => {
    const { name, value } = event.target.value;
    setInputValue({ ...inputValue, [name]: value })
  };

  return (
    <>
      <StLoginContainer>
      <Link to="/"><span>home</span></Link>
        <StLoginBox>
          <StLoginHeader>
            <h1> 오늘 운동 완료했니? </h1>
          </StLoginHeader>
          <div>
            <label>ID</label>
            <input type="text" name="username" onChange={inputChangeHandler} />
          </div>
          <div>
            <label>PW</label>
            <input type="password" name="password" onChange={inputChangeHandler} />
          </div>
          <div>
            <button onClick={() => {navigate(`/`, { replace: true })}}>로그인</button>
            <button onClick={()=>{navigate(`/form`)}}>회원가입</button>
          </div>        
        </StLoginBox>
      </StLoginContainer>      
    </>
  );
};

export default Login;


//styled components
const StLoginContainer = styled.div`
width: 400px;
height: 600px;
margin: 150px auto;
`;

const StLoginBox = styled.div`
  background-color: white;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  border: 1px solid gray;
  color: gray;
  border-radius: 10px;
`;

const StLoginHeader = styled.div`
  background-color: #4B89DC;
  width: 100%;
  height: 100px;
  color: white;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
   
`;