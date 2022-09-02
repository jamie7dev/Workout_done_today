import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <LoginHeader>
        <h1> 오늘 운동 완료했니? </h1>
      </LoginHeader>
      <LoginInput>
        <div>
          <label>ID</label>
          <input type="text" value="id" />
        </div>
        <div>
          <label>PW</label>
          <input type="password" value="pw" />
        </div>
        <div>
          <button onClick={() => {navigate(`/`, { replace: true })}}>로그인</button>
          <button onClick={()=>{navigate(`/form`)}}>회원가입</button>
        </div>        
      </LoginInput>
    </>
  );
};

export default Login;


//styled components
const LoginHeader = styled.div`
  background-color: dodgerblue;
  width: 600px;
  height: 100px;
  margin: 0 auto;
  color: white;
  text-align: center;
`;

const LoginInput = styled.div`
  background-color: whitesmoke;
  width: 600px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;