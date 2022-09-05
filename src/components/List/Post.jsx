import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const Post = () => {

    //preview file
    const [imageSrc, setImageSrc] = useState("");
    const [formData] = useState(new FormData());
    console.log("formData is", formData);
    const imageUpload = (fileBlob) => {
        console.log("fileblob is", fileBlob);
        formData.append('file', fileBlob);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

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

    // //formData 보내보기 


    // 게시글 데이터를 보내기위해
    const [input, setInput] = useState({
        title: "",
        body: "",
        imageSrc: ""
    });

    const addHandler = () => {
        const { title, body, } = input;
        formData.append('title', title);
        formData.append('body', body);
        console.log("formData is", formData);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        // const annoyance = {
        //     title: title,
        //     body: body,
        //     imageSrc: imageSrc
        // };
        axios({
            method: "POST",
            url: "http://localhost:3001/posts",
            mode: "cors",
            headers: {
                "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
            },
            data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
        })
        window.location.href = '/main';


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
                    <StButton onClick={onClickImageUpload}>이미지업로드하기🤳</StButton>
                    <div className="preview">
                        {imageSrc && (
                            <img
                                src={imageSrc}
                                alt="preview-img"
                                width="50%"
                                height="60%"
                            />
                        )}
                    </div>
                </StImage>

                <StPostContent>
                    <InputWrap>
                        <StLabel >제목</StLabel>
                        <StTitleInput placeholder="제목를 입력해주세요."
                            onChange={inputHandler}
                            type="text"
                            name="title"
                            id="title"
                            value={input.title} />
                    </InputWrap>

                    <InputWrap >
                        <StLabel>내용</StLabel>
                        <StBodyInput placeholder="내용을 입력해주세요."
                            onChange={inputHandler}
                            type="text"
                            name="body"
                            id="body"
                            value={input.body} />
                    </InputWrap>

                    <JoinBtn type="button"
                        onClick={() => { addHandler(); console.log(input); }}>
                        득근완료...🙆
                    </JoinBtn>

                </StPostContent>
            </StForm>
        </StPostContainer >
    );
};

export default Post;


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

const StImage = styled.div`
  background-color: #d6ecf3;
  border-radius: 15px;
  width: 40vw;
  max-height: 30vw;
  display: inline-block;
  padding-bottom: 35px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const StButton = styled.button`
  border: none;
  font-size: 20px;
  border-radius: 10px;
  margin-top: 30px;
  :hover{
  font-weight: 800 ;
  background-color: #ffa2a2;
  }
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

const StBodyInput = styled.input`
  margin-bottom: 20px;
  margin-top:10px;
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