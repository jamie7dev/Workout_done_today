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
                        <StTitle style={{ color: "black" }}>
                            {props?.post?.author}
                        </StTitle>
                    </div>
                    <>:</>
                    <div>
                        <StBody style={{ color: "black" }}>
                            {props?.post?.content}
                        </StBody>
                    </div>
                    {localStorage.getItem("username") === props?.post?.author ?
                        <div>
                            <StUdtBtn onClick={() => {
                                let change = prompt('수정할 내용을 입력해주세요.');
                                onUpdateHandler(change);
                            }}>수정</StUdtBtn>
                            <StRmvBtn onClick={() => onRemoveHandler()}>삭제</StRmvBtn>
                        </div>
                        : null}
                </StBox>
            </StContainer>
        </div >
    );
};

export default MiniCard;



const StContainer = styled.div`
    padding: 5px;
    display: flex;
`;

const StBox = styled.div`
    text-align: center;
    margin: 0 auto;
    background-color: #8ebefd;
    width: 60%;
    border-radius: 30px;
    max-height: 30vw;
    padding: 10px;
    display: flex;
    position: relative;
    justify-content: center;
`;

const StTitle = styled.div`
    margin-right: 20px;
    font-size:25px;
`;

const StBody = styled.div`
    margin-left: 20px;
    font-size:25px;
`;

const StUdtBtn = styled.button`
    position: absolute;
    right: 60px;
    bottom: 10px;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 5px;
    border:none;
    background-color: #b9b9fc;
    font-size: 18px;
:hover{
    background-color: #fc8686;
}
`;

const StRmvBtn = styled.button`
    position: absolute;
    right: 20px;
    bottom: 10px;
    cursor: pointer;
    border-radius: 5px;
    border:none;
    background-color: #b9b9fc;
    font-size: 18px;
:hover{
    background-color: #fc8686;
}
`;