import React from "react";
import styled from "styled-components";

const DetailCard = (props) => {

    console.log(props);
    return (
        <>
            <StHeader>👊 당연한거 아니겠냐고 👊</StHeader>
            <StContainer>
                <StImgBox>
                    {props.post.imageUrl && (
                        <img
                            src={props.post.imageUrl}
                            alt="preview-img"
                            width="70%"
                            height="80%"
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
                        <p style={{ marginRight: "10px", color: "white" }}>작성자 : </p>
                        <p> {props.post.author}</p>
                    </StContent>
                    <StContent>
                        <p style={{ marginRight: "10px", color: "white" }}>제목 :</p>
                        <p> {props.post.title}</p>
                    </StContent>
                    <StContent>
                        <p style={{ marginRight: "10px", color: "white" }}>내용 :</p>
                        <p style={{}}>{props.post.content}</p>
                    </StContent>
                </StContentBox>

            </StContainer>
        </>
    );
};

export default DetailCard;

const StContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  background-color: #4B89DC;
  width: 50%;
  border-radius: 30px;
  margin-left:auto;
  margin-right: auto;
  height: 50%;
  margin-bottom: 30px;
  margin-top: 30px;
  padding-top: 20px;
`;

const StImgBox = styled.div`
  text-align: center;
  margin-bottom: 30px;
    
`;

const StContent = styled.div`
  text-align: center;
  font-size: 30px;
  display: flex;
  justify-content: center;
`;

const StContentBox = styled.div`
`;

const StHeader = styled.div`
  margin  : auto;
  font-size: 30px;
  text-align: center;
  margin-top: 30px;
  padding: 1%;
  width:30%;
  height: 30px;
  background-color: whitesmoke;
  border-radius: 15px;
  border: 5px solid #4B89DC;
`;