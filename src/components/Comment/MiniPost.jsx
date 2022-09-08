import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/modules/Comment"
import { useParams } from "react-router-dom";

const MiniPost = ({ post }) => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const [input, setInput] = useState({
    content: "",
  });
  const addHandler = async (comment) => {
    let a = await axios.post("http://3.38.192.170:8080/api/comment",
      { postId: id, content: comment },
      {
        headers: {
          "Authorization": localStorage.getItem("Authorization"),   //accesstoken
          "RefreshToken": localStorage.getItem("RefreshToken")
        }
      })
    console.log(a)
    dispatch(createComment(a?.data?.data))
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // //image url 로 변경하기
  // let blob = new Blob([new ArrayBuffer()], { type: "image/png" });
  // const url = window.URL.createObjectURL(blob); // blob:http://localhost:1234/28ff8746-94eb-4dbe-9d6c-2443b581dd30
  // document.getElementById("file").src = url;



  //preview file



  return (
    <StPostContainer>
      <StPostHeader>
        <p style={{ color: "blue" }}>댓글달기--->>></p>
      </StPostHeader>
      <StForm>

        <InputWrap>
          <StLabel>내용</StLabel>
          <StTitleInput placeholder="내용을 입력해주세요."
            onChange={inputHandler}
            type="text"
            name="content"
            id="content"
            value={input.content} />


          <JoinBtn type="button"
            onClick={() => { addHandler(input.content); console.log("input is", input); }}>
            🙆올리기🙆
          </JoinBtn>
        </InputWrap>


      </StForm>
    </StPostContainer >
  );
};

export default MiniPost;

const StPostHeader = styled.div`
  font-size  : 20px; 
`;

const StPostContainer = styled.div`
  display: flex;
  margin-left:35%;
`;


const StForm = styled.div`
  display: flex;
  width: 450px;
  height: 50px;
  text-align: center;
`;






const StTitleInput = styled.input`
  border-radius: 5px;
  border: none;
  font-size: 15px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 190px;
  :hover{
    border: 2px solid black;
  }
`;


const InputWrap = styled.div`
  margin: auto;

`;

const StLabel = styled.label`
  margin-right: 20px;
  font-size: 20px;
`;

const JoinBtn = styled.button`
  border: none;
  margin-left: 40px;
  border-radius: 5px;

  :hover{
    background-color: #fd5757;
  }
`;