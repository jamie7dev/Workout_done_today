import React from "react";
import styled from "styled-components";

const List = () => {

  return (
    <>
    <StListContainer>
      <StListCard>
        <StListImage>이미지</StListImage>
        <StListTitle>제목</StListTitle>
        <StUser>id</StUser>
        <StTime>업로드 시간</StTime>
      </StListCard>    
      <StListCard>
        <StListImage>이미지</StListImage>
        <StListTitle>제목</StListTitle>
        <StUser>id</StUser>
        <StTime>업로드 시간</StTime>
      </StListCard>    
      <StListCard>
        <StListImage>이미지</StListImage>
        <StListTitle>제목</StListTitle>
        <StUser>id</StUser>
        <StTime>업로드 시간</StTime>
      </StListCard>      
    </StListContainer>
    </>
  );
};

export default List;

const StListContainer = styled.div`
  border: 1px solid black;
  background-color: whitesmoke;
  width: 1200px;
  height: 800px;
  margin: 50px auto;
  display: flex;
  justify-content: space-around;
`;

const StListCard = styled.div`
  background-color: dodgerblue;
  width: 300px;
  height: 400px;
  margin-top: 100px;
`;

const StListImage = styled.div`
  border: 1px solid black;
  width: 220px;
  height: 200px;
  margin: 40px;
  padding-top: 10px;

`;

const StListTitle = styled.div`
  border: 1px solid black;
  margin: 0 40px 10px 40px;
`;

const StUser = styled.div`
  border: 1px solid black;
  margin: 0 40px 10px 40px;
`;

const StTime = styled.div`
  border: 1px solid black;
  margin: 0 40px;
`;