import React from "react";
import useFetchComment from "./useFetchComment";
import styled from "styled-components";
import MiniCard from "./MiniCard";

const Comment = () => {
    const posts = useFetchComment(null);

    return (
        <div>
            <StMiniTitle>댓글 창</StMiniTitle>
            <StCommentBox>
                <StCard>
                    {posts?.map((post) => {
                        // kry=1 post=json{}
                        return <MiniCard key={post.id} post={post} />
                    })}
                </StCard>
            </StCommentBox>
        </div>
    );
};

export default Comment;

const StMiniTitle = styled.div`
    
`;

const StCommentBox = styled.div`
    
`;

const StCard = styled.div`
    
`;