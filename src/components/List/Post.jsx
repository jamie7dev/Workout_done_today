import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const Post = () => {
    //preview file
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

    //이미지업로드input창 styled 하기위해
    const imageInput = useRef();
    const onClickImageUpload = () => {
        imageInput.current.click();
    };

    //이미지 파일 데이터로 보내기위해
    const imageAdd = async () => {
        const formData = new FormData()

        formData.append("file", files[0])

        const value = [{
            title: "hello",
            contente: "wolrd"
        }]

        const blob = new Blob([JSON.stringify(value)], { type: "application/json" })

        formData.append("data", blob) // 또는  formData.append("data", JSON.stringify(value)); // JSON 형식으로 파싱.(백엔드의 요청에 따라 전송방식이 달라진다.)
        await axios({
            method: "POST",
            url: `http://xxxxxx.com/api/xx`,
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
            },
            data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
        })
    }


    // 게시글 데이터를 보내기위해

    const [input, setInput] = useState({
        title: "",
        body: "",
        image: ""
    });

    const addHandler = () => {
        const { title, body, } = input;
        const annoyance = {
            title: title,
            body: body,
            // imagefile: ""
        };
        axios.post("http://localhost:3001/post", annoyance);
    };

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };



    return (
        <StPostContainer>
            <StPostHeader>
                <h1>오운완 인증 올리기 !</h1>
            </StPostHeader>
            <StForm>
                <StImage>
                    <input
                        id="imagefile"
                        name="imagefile"
                        type="file"
                        accept="image/*"
                        ref={imageInput}
                        style={{ display: "none" }}
                        onChange={(e) => {
                            imageUpload(e.target.files[0])
                        }}
                    />
                    <button onClick={onClickImageUpload}>이미지업로드하기</button>
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
                    <InputWrap>
                        <StLabel >제목</StLabel>
                        <StInput placeholder="제목를 입력해주세요."
                            onChange={inputHandler}
                            type="text"
                            name="title"
                            id="title"
                            value={input.title} />
                    </InputWrap>

                    <InputWrap >
                        <StLabel>내용</StLabel>
                        <StInput placeholder="내용을 입력해주세요."
                            onChange={inputHandler}
                            type="text"
                            name="body"
                            id="body"
                            value={input.body} />
                    </InputWrap>

                    <JoinBtn type="button"
                        onClick={() => { addHandler(); console.log(input); }}>
                        득근완료...
                    </JoinBtn>

                </StPostContent>
            </StForm>
        </StPostContainer >
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

const StImage = styled.div`
  background-color: yellow;
  width: 50%;
  display: inline-block;
`;

const StPostContent = styled.div`
  background-color: white;
  width: 50%;
  display: inline-block;
`;

const StInput = styled.input`
  background-color: red;
`;

const InputWrap = styled.div`
    
`;

const StLabel = styled.label`
    
`;

const JoinBtn = styled.button`
    
`;