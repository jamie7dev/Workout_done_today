import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createComment} from "../../redux/modules/Comment"
import { useParams } from "react-router-dom";

const MiniPost = ({post}) => {
    const dispatch = useDispatch();
    const {id} = useParams()
    const [input, setInput] = useState({
        content: "",
    });
    const addHandler = async(comment) => {
      let a = await axios.post("http://3.38.192.170:8080/api/comment",
      {postId:id,content:comment},
      {headers: {
        "Authorization": localStorage.getItem("Authorization"),   //accesstoken
        "RefreshToken": localStorage.getItem("RefreshToken")}})
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
                <h1>댓글달기</h1>
            </StPostHeader>
            <StForm>
                <StPostContent>
                    <InputWrap>
                        <StLabel>내용</StLabel>
                        <StTitleInput placeholder="내용을 입력해주세요."
                            onChange={inputHandler}
                            type="text"
                            name="content"
                            id="content"
                            value={input.content} />
                    </InputWrap>

                    <JoinBtn type="button"
                        onClick={() => { addHandler(input.content); console.log("input is", input); }}>
                        🙆올리기🙆
                    </JoinBtn>

                </StPostContent>
            </StForm>
        </StPostContainer >
    );
};

export default MiniPost;


const StPostContainer = styled.div`
background-color: whitesmoke;
width: 100%;
max-height: 300vw;
margin-top: 40px;
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

const StForm = styled.div`
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




const StPostContent = styled.div`
  background-color: white;
  width: 60vw;
  border-radius : 15px;
  display: inline-block;
  margin-bottom: 20px;
`;

const StTitleInput = styled.input`
  margin-top: 20px;

  width: 60%;
  padding: 15px 2%;
  font-size: 15px;
  border-radius: 8px;
`;


const InputWrap = styled.div`
    border-radius: 15px;
`;

const StLabel = styled.label`
  font-size : 15px;
  font-weight: 600;
  margin-right: 20px;
`;

const JoinBtn = styled.button`
  background-color: #dfdddd;
  border: none;
  border-radius: 15px;
  font-size: 18px;
  padding: 1.5%;
  margin-bottom: 20px;
  :hover{
    background-color: #c1c1f9;
  }
`;