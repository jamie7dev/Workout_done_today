import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/modules/userSlice";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const initialState = {
        username: "",
        password: ""
    }

    const [inputValue, setInputValue] = useState(initialState);


    const fetchLogin = async () => {
        const { data } = await axios.get("http://localhost:3001/userinfo");
        // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
    };


    useEffect(() => {
        // effect 구문에 생성한 함수를 넣어 실행합니다.
        fetchLogin();
    }, []);



    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value })
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (inputValue.username.trim() === "") return alert("아이디를 입력해주세요!");
        if (inputValue.password.trim() === "") return alert("패스워드를 입력해주세요!");

        dispatch(login({
            ...inputValue,
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
                    <Link to="/"><span>home</span></Link>
                    <StLoginBox>
                        <StLoginHeader>
                            <h1> 오늘 운동 완료했니? </h1>
                        </StLoginHeader>
                        <div className="username-box">
                            <label htmlFor="username">ID</label>
                            <input
                                type="text"
                                name="username"
                                value={inputValue.username}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="password-box">
                            <label htmlFor="password">PW</label>
                            <input
                                type="password"
                                name="password"
                                value={inputValue.password}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="btns">
                            <button>로그인</button>
                            <button onClick={() => { navigate(`/form`) }}>회원가입</button>
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
  h1 {
    line-height: 50px;
  }
`;