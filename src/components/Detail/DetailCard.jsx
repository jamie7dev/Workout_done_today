import React, { useState }, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const DetailCard = (props) => {
    const navigate = useNavigate();
    const [formData] = useState(new FormData());
    const deleteHandler = () => {
        axios({
            method: "DELETE",
            url: `http://3.38.192.170:8080/api/post/${props.post.id}`,        //백앤드 서버로 변경함
            mode: "cors",
            headers: {
                "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                "RefreshToken": localStorage.getItem("RefreshToken"),
                "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
            },
            data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
        })
    };
    return (
        <>
            <StHeader>👊 당연한거 아니겠냐고 👊</StHeader>

            <StContainer>
                <StImgBox>
                    {props.post.imageUrl && (
                        <img
                            src={props.post.imageUrl}
                            width="80%"
                            height="80%"
                            alt="preview-img"

                            style={{
                                border: "2px solid white",
                                borderRadius: "10px",
                                backgroundColor: "whitesmoke",
                                padding: "20px"
                            }}
                        />
                    )}
                </StImgBox>
                <StContentBox>
                    <StContent>
                        <p style={{ marginRight: "10px", color: "white", padding: "5px" }}> 작성자 : </p>
                        <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px" }}> {props.post.author}</p>
                    </StContent>
                    <StContent>
                        <p style={{ marginRight: "10px", color: "white", padding: "5px" }}> 제목 :</p>
                        <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px" }}> {props.post.title}</p>
                    </StContent>
                    <StContent>
                        <p style={{ marginRight: "10px", color: "white", padding: "5px" }}> 내용 :</p>
                        <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px" }}>{props.post.content}</p>
                    </StContent>
                </StContentBox>
                <StBtnBox>
                    <StButton>수정</StButton>

                    <StButton onClick={()=>{deleteHandler();}}>삭제</StButton>

                    <StButton onClick={()=>{navigate('/post')}}>또 인증하기!</StButton>
                </StBtnBox>
            </StContainer>
        </>
    );
};

export default DetailCard;


const StHeader = styled.div`
  margin  : auto;
  font-size: 30px;
  text-align: center;
  margin-top: 10px;
  padding: 0.5%;
  padding-bottom: 20px;
  width:30%;
  height: 30px;
  background-color: whitesmoke;
  border-radius: 15px;
  border: 5px solid #4B89DC;
`;

const StContainer = styled.div`
  text-align: center;
  margin: 30px auto;
  background-color: #8ebefd;
  width: 1000px;
  height: auto;
  border-radius: 30px;
  max-height: 50vw;
  padding: 20px;
  display: flex;
  /* justify-content: center; */
  position: relative;
`;


const StImgBox = styled.div`
width: 500px;
max-width: 600px;
max-height: 60vh;
display: flex;
align-items: center;
  /* text-align: center; */
  /* margin-bottom: 10px; */  
  /* float: left; */
`;

const StContent = styled.div`
  text-align: center;
  font-size: 18px;
  display: flex;
  /* justify-content: center; */
`;

const StContentBox = styled.div`
width: 400px;
height: 300px;
/* background-color: green; */
`;


const StBtnBox = styled.div`
width: 280px;
height: 40px;
/* background-color: red; */
display: inline-block;
position: absolute;
right: 10px;
bottom: 10px;
`;

const StButton = styled.button`
  border: none;
  background-color: whitesmoke;
  font-size: 20px;
  margin: 10px;
  margin-right: 15px;
  text-align: center;
  display: inline-block;
  justify-content: flex-end;
  cursor: pointer;
  /* border: 1px solid white; */
  border-radius: 50px;
`;