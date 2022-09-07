import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const navigate = useNavigate();

    // //image url 로 변경하기
    // let blob = new Blob([new ArrayBuffer()], { type: "image/png" });
    // const url = window.URL.createObjectURL(blob); // blob:http://localhost:1234/28ff8746-94eb-4dbe-9d6c-2443b581dd30
    // document.getElementById("file").src = url;



    //preview file
    const [imageSrc, setImageSrc] = useState("");
    const [formData] = useState(new FormData());
    // console.log("formData is", formData);

    const imageUpload = (fileBlob) => {
        // console.log("fileblob is", fileBlob);
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
            // axios({
            //     method: "POST",
            //     url: "http://3.38.192.170:8080/api/upload",          //백앤드 서버로 변경함
            //     mode: "cors",
            //     headers: {
            //         "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
            //     },
            //     data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
            // })
        });

    };

    //이미지업로드input창 styled 하기위해
    const imageInput = useRef();
    const onClickImageUpload = () => {
        imageInput.current.click();
    };



    // 게시글 데이터를 보내기위해
    const [input, setInput] = useState({
        title: "",
        content: "",
        imageSrc: ""
    });

    const addHandler = () => {
        const { title, content, } = input;

        let variables = [{
            title: title,
            content: content
        }]

        const json = JSON.stringify(input)
        const titleblob = new Blob([variables[0].title], { type: "application/json" })
        const contentblob = new Blob([variables[0].content], { type: "application/json" })

        formData.append('title', titleblob);
        formData.append('content', contentblob);


        // console.log("formData is", formData);
        console.log(typeof (formData));
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        // const annoyance = {
        //     title: title,
        //     body: body,
        //     imageSrc: imageSrcd
        // };
        axios({
            method: "POST",
            url: "http://3.38.192.170:8080/api/post",          //백앤드 서버로 변경함
            mode: "cors",
            headers: {
                "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                "RefreshToken": localStorage.getItem("RefreshToken"),
                "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
            },
            data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
        })


        // window.location.href = '/main';
        navigate('/main');


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
                                width="60%"
                                height="40%"
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
                            name="content"
                            id="content"
                            value={input.content} />
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
min-width: 900px;
max-height: 300vw;
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
  font-size: 26px;
`;

const StForm = styled.div`
  background-color: whitesmoke;
  width: 100%;
  min-width: 500px;
  min-height: 300px;
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
  width: 60%;
  height: 40%;
  /* max-height: 30vw; */
  /* min-width: 500px; */
  /* min-height: 100px; */
  display: inline-block;
  padding-bottom: 35px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const StButton = styled.button`
  border: none;
  background-color: #dfdddd;
  font-size: 20px;
  border-radius: 10px;
  margin: 30px;
  padding: 1%;
  cursor: pointer;
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
padding: 10px;
    
`;

const StLabel = styled.label`
  font-size : 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const JoinBtn = styled.button`
  background-color: #dfdddd;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  padding: 1.2%;
  margin-bottom: 20px;
  cursor: pointer;
  :hover{
    background-color: #c1c1f9;
  }
`;