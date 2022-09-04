import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Post = () => {
  const [imageSrc, setImageSrc] = useState("");

  const imageUpload = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
     return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  return (
    <>
    <Link to="/"><span>home</span></Link>
    <StPostContainer>
    <StPostHeader>
    <h1>오운완 인증해주세요</h1>
    </StPostHeader>
    <StPostBox>
      <StImage>
      <p>이미지를 업로드해주세요</p>
      <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            imageUpload(e.target.files[0])
          }}
        />
        <div className="preview">
          {imageSrc && (
            <img
              src={imageSrc}
              alt="preview-img"
              width="280px"
              height="350px"
            />
          )}
        </div>
      </StImage>
      <StPostContent>
        <div>타이틀</div>
        <div>내용</div>
        <button>인증하기</button>
      </StPostContent>
    </StPostBox>
    </StPostContainer>
    </>
  );

};

export default Post;


const StPostContainer = styled.div`
background-color: whitesmoke;
width: 1000px;
height: 580px;
margin: 0 auto;
color: #4B89DC;
border-radius: 8px;
`;

const StPostHeader = styled.div`
  background-color: #4B89DC;
  width: 100%;
  height: 100px;
  color: white;
  text-align: center;
  line-height: 100px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  /* font-family: 'Do Hyeon', sans-serif; */
  font-size: 30px;
`;

const StPostBox = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  color: gray;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const StImage = styled.div`
  background-color: white;
  width: 50%;
  display: inline-block;
`;

const StPostContent = styled.div`
  background-color: white;
  width: 50%;
  display: inline-block;
`;