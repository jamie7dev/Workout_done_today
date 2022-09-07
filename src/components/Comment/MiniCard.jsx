import React, { forwardRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const MiniCard = forwardRef((props, ref) => {
    const navigate = useNavigate();
    // key=1 post=json{}, props에 들어가잇음

    return (
        <div>
            <StContainer>
                <StBox ref={ref} onClick={() => {
                    navigate(`/detail/${props.post.postId}`);
                }}>

                    {props.post.imageUrl && (
                        <img
                            src={props.post.imageUrl}
                            alt="preview-img"
                            width="70%"
                            height="60%"
                            style={{
                                border: "2px solid white",
                                borderRadius: "10px",
                                backgroundColor: "whitesmoke",
                                padding: "20px"
                            }}
                        />
                    )}

                    <p style={{ color: "black" }}>
                        작성자 : {props.post.username}
                    </p>

                    <p style={{ color: "black" }}>
                        제목 : {props.post.title}
                    </p>

                    <p style={{ color: "black" }}>
                        조회수 :{props.post.watch}
                    </p>


                </StBox>
            </StContainer>
        </div >
    );
});

export default MiniCard;



const StContainer = styled.div`
    padding: 10px;
    display: flex;
`;

const StBox = styled.div`
    margin: auto;
    margin-left: 50px;
    background-color: #8adafd;
    border-radius: 10px;
    padding : 5px;
    width: 300px;
    height:400px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;

`;