import React from "react";
import styled from "styled-components";
import Card from "./Card";
import useFetchPost from "./useFetchPost";
import { useNavigate } from "react-router-dom";

const List = () => {
  const posts = useFetchPost(null);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <PostTitle >
          물론이지, 너도 ?
          <StButton onClick={() => {
            navigate(`/post`);
          }}>
            👉인증가실?👈
          </StButton>
        </PostTitle>
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
  width: 100vw;
  height: 100%;
  margin: auto;

`;

const StCard = styled.div`
  margin: auto;
  padding: 20px;
  display: inline-flexbox;
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

const StButton = styled.button`
  margin-left:60px ;
  font-size: 30px;
  font-weight: 600;
  border-radius: 10px;
  background-color: whitesmoke;
  border: none;
  text-decoration: underline;
  :hover{
    background-color: #f2f294;
    border: 4px solid #4B89DC;
    text-decoration: none;
  }
  :touch-action{
    font-size: 15px;
  }
`;