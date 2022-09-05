import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __login } from "../../redux/modules/userSlice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const initialState = {
    username: "",
    password: ""
  }

  const [inputValue, setInputValue] = useState(initialState);


  // const fetchLogin = async () => {
  //   const { data } = await axios.get("http://localhost:3001/userinfo");
  //    // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  // };


  // useEffect(() => {
	// 	// effect 구문에 생성한 함수를 넣어 실행합니다.
  //   fetchLogin();
  // }, []);

  

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value })
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("ddd");
    if (inputValue.username.trim() === "") return alert("아이디를 입력해주세요!");
    if (inputValue.password.trim() === "") return alert("패스워드를 입력해주세요!");

    dispatch(__login({...inputValue,
      username: inputValue.username,
      password: inputValue.password,
      loggedIn: true
    }));
    setInputValue(initialState);

    console.log(inputValue);
  };
  

 

  return (
    <>
    <form onSubmit={onSubmitHandler}>
      <StLoginContainer>
        <Link to="/main"><span>home</span></Link>
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
  border: 1px solid #4B89DC;
  color: #4B89DC;
  border-radius: 10px;
  line-height: 40px;
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
    line-height: 50px;
  }
`;

const StLoginInputBox = styled.div`
margin-top: 20px;
`;

const StLoginInput = styled.input`
  font-size: 16px;
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
  display: inline-block;
  margin: 40px 38px;
  border-radius: 4px;
  color: #4B89DC;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem; 
  &:hover{  
    background-color : #4B89DC;
    color : white;
  }
`;

// const StSignupBtn = styled.div`
//   background-color: #4B89DC;
//   outline: none;
//   display: inline-block;
//   margin: 44px 30px;
//   outline: none;
//   border: none;
//   border-radius: 4px;
//   color: white;
//   font-weight: bold;
//   cursor: pointer;
//   padding-left: 1rem;
//   padding-right: 1rem; 
  
// `;