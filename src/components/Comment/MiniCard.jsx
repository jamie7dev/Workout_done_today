import React from "react";
import styled from "styled-components";
import { removeComment, updateComment } from "../../redux/modules/Comment"
import axios from "axios";
import { useDispatch } from "react-redux";

const MiniCard = (props) => {
    const dispatch = useDispatch();
    console.log(props?.post?.id);
    const onRemoveHandler = async () => {
        let a = await axios.delete(`http://3.38.192.170:8080/api/comment/${props.post.id}`,
            {
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                    "RefreshToken": localStorage.getItem("RefreshToken")
                }
            })
        dispatch(removeComment())
    }
    const onUpdateHandler = async (comment) => {
        console.log({ content: comment })
        let a = await axios.put(`http://3.38.192.170:8080/api/comment/${props.post.id}`,
            { content: comment },
            {
                headers: {
                    "Authorization": localStorage.getItem("Authorization"),   //accesstoken
                    "RefreshToken": localStorage.getItem("RefreshToken")
                }
            })
        dispatch(updateComment({ id: props?.post?.id, author: localStorage.getItem("username"), content: comment }))
    }
    return (
        <div>
            <StContainer>
                <StBox>
                    <div>
                        <p style={{ color: "black" }}>
                            작성자 : {props?.post?.author}
                        </p>

                        <p style={{ color: "black" }}>
                            내용 : {props?.post?.content}
                        </p>
                    </div>
                    {localStorage.getItem("username") === props?.post?.author ?
                        <div>
                            <button onClick={() => {
                                let change = prompt('수정할 내용을 입력해주세요.');
                                onUpdateHandler(change);
                            }}>수정</button>
                            <button onClick={() => onRemoveHandler()}>삭제</button>
                        </div>
                        : null}
                </StBox>
            </StContainer>
        </div >
    );
};

export default MiniCard;



const StContainer = styled.div`
    padding: 10px;
    display: flex;
`;

const StBox = styled.div`
    text-align: center;
    margin: 0 auto;
    background-color: #8ebefd;
    width: 60%;
    height: 20%;
    border-radius: 30px;
    max-height: 30vw;
    padding: 10px;
    display: flex;
    position: relative;

`;

const StUdtBtn = styled.button`
    position: absolute;
    right: 60px;
    bottom: 20px;
    cursor: pointer;
`;

const StRmvBtn = styled.button`
    position: absolute;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
`;