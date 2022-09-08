// import useFetchComment from "./useFetchComment";
import styled from "styled-components";
import MiniCard from "./MiniCard";
import React, { useState } from "react";
import MiniPost from "./MiniPost";
import { __getComments } from "../../redux/modules/Comment"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Comment = (props) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.comment)
    // const posts = useFetchComment(props.post.id);
    const [visible, setVisivle] = useState(false);
    useEffect(() => {
        dispatch(__getComments(props.post.id));
    }, [dispatch])

    return (
        <StCommentContainer>
            <StMiniTitle>댓글 창</StMiniTitle>
            {/* 이벤트 핸들러 추가해야함. 버튼으로 input 숨기기기능 */}
            <StAddBtn onClick={() => {
                setVisivle(!visible);
            }} >
                {visible ? "구경하기" : "추가하기"}
            </StAddBtn>
            {visible && <MiniPost />}
            <StCommentBox>
                <StCard>
                    {posts?.data?.data?.map((post) => {
                        // kry=1 post=json{}
                        return <MiniCard key={post?.id} post={post} id={props.post.id} />
                    })}
                </StCard>
            </StCommentBox>
        </StCommentContainer>
    );
};

export default Comment;

const StCommentContainer = styled.div`
    
`;

const StMiniTitle = styled.div`
    
`;

const StCommentBox = styled.div`
    
`;

const StCard = styled.div`
    
`;

const StAddBtn = styled.button`
    
`;
