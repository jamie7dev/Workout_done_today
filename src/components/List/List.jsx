import React from "react";
import styled from "styled-components";
import Card from "./Card";
import useFetchPost from "./useFetchPost";

const List = () => {
    const posts = useFetchPost(null);
    return (
        <>
            <div>
                <PostTitle>물론이지, 너도 ?</PostTitle>
                <StListContainer>
                    <StCard>
                        {posts?.map((post) => {
                            // kry=1 post=json{}
                            return <Card key={post.id} post={post} />
                        })}
                    </StCard>
                </StListContainer>
            </div>

        </>
    );
};

export default List;

const StListContainer = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
`;

const StCard = styled.div`
  display: flex;
  margin: auto;
  padding: 20px;
`;

const PostTitle = styled.div`
  margin  : auto;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  height: 60px;
  background-color: whitesmoke;
  width: 100%
`;