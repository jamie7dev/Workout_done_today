import React from "react";
import styled from "styled-components";

const List = () => {

  return (
    <>
    <StListContainer>
      <StListCard>
        <StListImage>이미지</StListImage>
        <p>(조회수)</p>
        <StListTitle>제목</StListTitle>
        <StUser>username</StUser>
        <StTime>날짜</StTime>
      </StListCard>    
      <StListCard>
        <StListImage>이미지</StListImage>
        <p>(조회수)</p>
        <StListTitle>제목</StListTitle>
        <StUser>username</StUser>
        <StTime>날짜</StTime>
      </StListCard>    
      <StListCard>
        <StListImage>이미지</StListImage>
        <p>(조회수)</p>
        <StListTitle>제목</StListTitle>
        <StUser>username</StUser>
        <StTime>날짜</StTime>
      </StListCard>      
    </StListContainer>
    </>
  );

};

export default List;

const StListContainer = styled.div`
  
  background-color: whitesmoke;
  width: 1200px;
  height: 1200px;
  margin: 50px auto;
  display: flex;
  justify-content: space-evenly;
`;

const StListCard = styled.div`
  background-color: white;
  border: 1px solid #4B89DC;
  width: 300px;
  height: 400px;
  margin-top: 100px;
  p {
    margin: 10px 40px;
  }
`;

const StListImage = styled.div`
  border: 1px solid #4B89DC;
  width: 220px;
  height: 200px;
  margin: 40px 40px 0 40px;
  padding-top: 10px;
`;

const StListTitle = styled.div`
  border: 1px solid #4B89DC;
  margin: 0 40px 10px 40px;
`;

const StUser = styled.div`
  border: 1px solid #4B89DC;
  margin: 0 40px 10px 40px;
`;

const StTime = styled.div`
  border: 1px solid #4B89DC;
  margin: 0 40px;
`;