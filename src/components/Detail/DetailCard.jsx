import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { __getPosts, __updatePosts, __deletePosts } from '../../redux/modules/postSlice';

const DetailCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const { data } = useSelector((state) => state.data.data);

    console.log("posts is", data);

    const login = localStorage.getItem("RefreshToken");
    const name = localStorage.getItem("name");

    const [author, setAuthor] = useState(postObj?.author);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState();
    const [preview, setPreview] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        dispatch(__getPosts());
    }, [dispatch, isEditMode]);

    let postObj = data.find((post) => {
        if (String(post.id) === id) {
            return post
        } else {
            return null
        }
    });

    const resetStates = () => {
        setAuthor("");
        setTitle("");
        setImage();
        setPreview("");
        setContent("");
    };

    const onChangeImg = (e) => {
        console.log("target file is", e.target.files);
        setImage(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    const onSaveBtnHandler = async (e) => {
        if (
            title.trim() === '' ||
            image.trim() === '' ||
            // sayme.trim() === '' ||
            content.trim() === ''
        ) {
            return alert('모든 항목을 입력하고 저장하세요.');
        } else if (window.confirm('수정사항을 저장하시겠습니까?')) {
            const formData = new FormData();
            formData.append('author', author);
            // formData.append('date', date);
            formData.append('title', title);
            formData.append('image', image);
            // formData.append('sayme', sayme);
            formData.append('content', content);
            dispatch(__updatePosts(formData));
            setIsEditMode(false);
            resetStates();
        }
    };

    const onDeleteHandler = () => {
        if (window.confirm('일기를 삭제하시겠습니까?')) {
            dispatch(__deletePosts(id));
            navigate('/');
        }
    };


    // const deleteHandler = () => {
    //     if (window.confirm("인증을 삭제하시겠습니까?")) {
    //         axios({
    //             method: "DELETE",
    //             url: `http://3.38.192.170:8080/api/post/${props.post.id}`,        //백앤드 서버로 변경함
    //             mode: "cors",
    //             headers: {
    //                 "Authorization": localStorage.getItem("Authorization"),   //accesstoken
    //                 "RefreshToken": localStorage.getItem("RefreshToken"),
    //                 "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
    //             },
    //             data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
    //         })
    //         navigate('/main');
    //         window.location.reload();
    //     } else {
    //         return window.location.reload();
    //     }
    // };

    // const [author, setAuthor] = useState(props.data.author);
    // const [title, setTitle] = useState(props.data.title)
    // const [content, setContent] = useState(props.data.content);

    // const resetStates = () => {
    //     setAuthor("");
    //     setTitle("");
    //     // setImage();
    //     // setPreview("");
    //     setContent("");
    // };

    // const ChangeHandler = () => {
    //     if (
    //         title.trim() === '' ||
    //         content.trim() === ''
    //         // image.trim() === ''

    //     ) {
    //         return alert('모든 항목을 입력하고 저장하세요.');
    //     } else if (window.confirm('수정사항을 저장하시겠습니까?')) {
    //         const formData = new FormData();
    //         formData.append('author', author);
    //         formData.append('title', title);
    //         formData.append('content', content);
    //         // formData.append('image', image);
    //         setIsEditMode(false);
    //         resetStates();
    //         axios({
    //             method: "PUT",
    //             url: `http://3.38.192.170:8080/api/post/${props.post.id}`,        //백앤드 서버로 변경함
    //             mode: "cors",
    //             headers: {
    //                 "Authorization": localStorage.getItem("Authorization"),   //accesstoken
    //                 "RefreshToken": localStorage.getItem("RefreshToken"),
    //                 "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
    //             },
    //             data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
    //         })
    //     }
    // };

    // const [input, setInput] = useState({
    //     title: setTitle,
    //     content: setContent,
    //     // imageSrc: 
    // });

    // const inputChangeHandler = (e) => {
    //     const { name, value } = e.target;
    //     setInput({ ...input, [name]: value });
    // };


    return (
        <>
            {isEditMode ? (
                //수정버튼 눌렀을 때 true 일경우 뜨는 화면
                <>
                    <StHeader>👊 당연한거 아니겠냐고 (수정 중~)👊</StHeader>

                    <StContainer>
                        <StImgBox>
                            <input
                                type='file'
                                accept='image/*'
                                name='image'
                                className="imginput"
                                onChange={onChangeImg}
                                style={{
                                    border: "2px solid white",
                                    borderRadius: "10px",
                                    backgroundColor: "whitesmoke",
                                    padding: "20px"
                                }}
                            />
                            <img
                                alt="이미지를 업로드해주세요"
                                src={preview ? preview : "이미지가 없습니다"}
                            ></img>
                        </StImgBox>
                        <StContentBox>
                            <StContent>
                                <p style={{ marginRight: "10px", color: "white", padding: "5px" }}>작성자 : </p>
                                <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px" }}>
                                    {postObj.author} </p>
                            </StContent>

                            <StContent>
                                <p style={{ marginRight: "10px", color: "white", padding: "5px" }}> 제목 :</p>
                                <input
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value); }} />
                            </StContent>
                            <StContent>
                                <p style={{ marginRight: "10px", color: "white", padding: "5px" }}> 내용 :</p>
                                <input
                                    value={content}
                                    onChange={(e) => { setContent(e.target.value); }} />
                            </StContent>
                        </StContentBox>
                        <StBtnBox>
                            <StButton onClick={onSaveBtnHandler}> 완료</StButton>

                            <StButton onClick={() => { setIsEditMode(false) }}>취소</StButton>

                        </StBtnBox>
                    </StContainer>
                </>)
                :
                (
                    <>
                        <StHeader>👊 당연한거 아니겠냐고 👊</StHeader>

                        <StContainer>
                            <StImgBox>
                                {postObj.imageUrl && (
                                    <img
                                        src={postObj.imageUrl}
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
                                    <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px" }}> {postObj.author}</p>
                                </StContent>
                                <StContent>
                                    <p style={{ marginRight: "10px", color: "white", padding: "5px" }}> 제목 :</p>
                                    <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px" }}> {postObj.title}</p>
                                </StContent>
                                <StContent>
                                    <p style={{ marginRight: "10px", color: "white", padding: "5px" }}> 내용 :</p>
                                    <p style={{ backgroundColor: "white", borderRadius: "5px", padding: "5px" }}>{postObj.content}</p>
                                </StContent>
                            </StContentBox>
                            <StBtnBox>
                                {login == null || name !== postObj.user_name ? false :
                                    (
                                        <>
                                            <StButton onClick={() => { setIsEditMode(true); }}>수정</StButton>
                                            <StButton onClick={onDeleteHandler}>삭제</StButton>
                                        </>
                                    )}

                                <StButton onClick={() => { navigate('/post') }}>또 인증하기!</StButton>
                            </StBtnBox>
                        </StContainer>
                    </>
                )}
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

  width: 70%;
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