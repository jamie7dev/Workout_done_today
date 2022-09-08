import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { removePost } from "../../redux/modules/addPost"
import { updatePost, __getDetail } from "../../redux/modules/detail";

const DetailCard = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState(false);
    const [img, setImg] = useState("");
    let fileForm = /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/;
    const formData = new FormData();
    const initialState = {
        title: "",
        content: ""
    }
    const params = useParams();
    const postId = parseInt(params.id);
    const data = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(__getDetail(postId));
    }, [dispatch])
    const [post, setPost] = useState(initialState)
    const onRemovePost = async () => {

        if (window.confirm("삭제하시겠습니까 ???")) {
            let a = await axios.delete(`http://3.38.192.170:8080/api/post/${postId}`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                        "RefreshToken": localStorage.getItem("RefreshToken"),
                        "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
                    }
                });


            dispatch(removePost(postId));
            navigate("/main")
        }
    }


    const onUpdatePost = async () => {
        const { title, content, } = post;

        let variables = [{
            title: title,
            content: content
        }]

        const json = JSON.stringify(post)
        console.log(json);
        const titleblob = new Blob([variables[0].title], { type: "application/json" })
        const contentblob = new Blob([variables[0].content], { type: "application/json" })
        console.log(titleblob)
        formData.append('file', img);
        formData.append('title', titleblob);
        formData.append('content', contentblob);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        let a = await axios.put(`http://3.38.192.170:8080/api/post/${postId}`, formData,
            {
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                    "RefreshToken": localStorage.getItem("RefreshToken"),
                    "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
                }
            });
        console.log(a.data.data);
        dispatch(updatePost({
            title: a?.data?.data?.title,
            author: a?.data?.data?.username,
            id: a?.data?.data?.postId,
            imageUrl: a?.data?.data?.imageUrl,
            commentList: data?.data?.data?.commentList,
            content: post.content
        }));

        setInput(!input)
    }
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };
    const onChange = async (e) => {
        // input file에서 선택된 file을 img로 지정
        setImg(e.target.files[0]);
        // 이미지 파일이 아니면 이후 동작을 생략하고 경고문구 출력
        // if(!img.name.match(fileForm)){
        //     alert("이미지파일(.jpg, .png, .bmp)만 올려주세요.")
        //     return
        // }
        console.log(img)
        // 폼데이터 형식 선언
        // api에서 요구하는 key값과 value값 지정 (key : "image", value: 이미지파일)
        formData.append('image', img);
        // 이미지만 보내면되기때문에 더이상 append하지않고 이미지파일 전송
        // 사진을 선택하고 사진선택기능 숨기기
        // 폼데이터 들어가는 형식을 보기위한 내용
    }
    console.log(data?.data?.data?.imageUrl)


    const imageInput = useRef();
    const onClickImageUpload = () => {
        imageInput.current.click();
    };
    return (
        <>
            <StHeader>👊 당연한거 아니겠냐고 👊</StHeader>
            {!input ?
                <StContainer>
                    <StImgBox>
                        {data?.data?.data?.imageUrl && (
                            <img
                                src={data?.data?.data?.imageUrl}
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
                            <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px" }}> {data?.data?.data?.author}</p>
                        </StContent>
                        <StContent>
                            <p style={{ marginRight: "10px", color: "white", padding: "5px" }}> 제목 :</p>
                            <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px" }}> {data?.data?.data?.title}</p>
                        </StContent>
                        <StContent>
                            <p style={{ marginRight: "10px", color: "white", padding: "5px" }}> 내용 :</p>
                            <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px" }}>{data?.data?.data?.content}</p>
                        </StContent>
                    </StContentBox>
                    {localStorage.getItem("username") === data?.data?.data?.author ?
                        <StBtnBox>
                            <StMiniButton onClick={() => setInput(!input)}>수정</StMiniButton>

                            <StMiniButton onClick={() => { onRemovePost() }} >삭제</StMiniButton>

                            <StMiniButton onClick={() => { navigate('/post') }}>또 인증하기!</StMiniButton>
                        </StBtnBox>
                        : null}
                </StContainer>
                : <StContainer>
                    <input
                        type='file'
                        accept='image/*'
                        name='profile_img'
                        ref={imageInput}
                        style={{ display: "none" }}
                        onChange={onChange} />
                    <StImgButton onClick={onClickImageUpload}>이미지업로드하기🤳</StImgButton>
                    <StTittleInput
                        placeholder="제목"
                        type="text"
                        name="title"
                        value={post.title}
                        className="add-input input-body"
                        onChange={onChangeHandler} />
                    <StBodyInput
                        placeholder="내용"
                        type="text"
                        name="content"
                        value={post.content}
                        className="add-input"
                        onChange={onChangeHandler} />
                    <StButton onClick={() => { onUpdatePost() }}>수정</StButton>
                    <StButton onClick={() => { setInput(!input) }}>취소</StButton>
                </StContainer>}
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

  width: 50%;
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
max-height: 300px;
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
  margin-right: 15px;
  text-align: center;
  display: inline-block;
  justify-content: flex-end;
  cursor: pointer;
  border-radius: 50px;
  padding: 3%;
  :hover{
    border: 2px solid red;
    background-color: #ec8888;
}
`;

const StTittleInput = styled.input`
  width: 200px;
  padding: 15px 2%;
  font-size: 15px;
  border-radius: 8px;
  margin-left: 10px;
  border:none;
  :hover{
    border:2px solid black;
  }
`;

const StBodyInput = styled.input`
  margin-left: 20px;
  width: 30%;
  padding: 15px 2%;
  font-size: 15px;
  border-radius: 8px;   
  border:none;
  :hover{
    border:2px solid black;
  }
`;

const StMiniButton = styled.button`
  border: none;
  background-color: whitesmoke;
  font-size: 20px;
  margin-right: 2px;
  margin-left: 8px;
  text-align: center;
  justify-content: flex-end;
  padding: 3%;
  border-radius: 50px;
  :hover{
    background-color: #ff4d4d;
    border: 5px solid #2381fc85;
  }
`;

const StImgButton = styled.button`
    border: none;
  background-color: whitesmoke;
  font-size: 14px;
  width: 15%;
  margin-right: 2px;
  margin-left: 8px;
  text-align: center;
  display: inline-block;
  justify-content: flex-end;
  cursor: pointer;
  border-radius: 50px;
  padding: 1%;
  :hover{
    border: 5px solid blue;
  }
`;