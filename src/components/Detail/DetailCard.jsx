import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const DetailCard = (props) => {
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
                            width="45%"
                            height="45%"
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
                    <StButton>수정하기</StButton>

                    <StButton onClick={() => { deleteHandler(); }}>삭제하기</StButton>

                    <StButton>또 인증하기!</StButton>
                </StBtnBox>
            </StContainer>
        </>
    );
};

export default DetailCard;

const StContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  background-color: #8ebefd;
  width: 40%;
  height: auto;
  border-radius: 30px;
  margin-left:auto;
  margin-right: auto;
  max-height: 50vw;
  margin-bottom: 30px;
  margin-top: 20px;
  padding-top: 20px;
`;

const StImgBox = styled.div`
  text-align: center;
  margin-bottom: 10px;
  max-height: 60vw;
`;

const StContent = styled.div`
  text-align: center;
  font-size: 20px;
  display: flex;
  justify-content: center;
`;

const StContentBox = styled.div`
//비어져있어도 상관없음
`;

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

const StBtnBox = styled.div`
  justify-content: center;
`;

const StButton = styled.button`
  border: none;
  background-color: #8ebefd;
  font-size: 20px;
  margin: 10px;
  margin-right: 15px;
  text-align: center;
`;