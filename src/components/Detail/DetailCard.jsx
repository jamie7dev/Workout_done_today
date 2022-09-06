import React from "react";
import Header from "../Header/Header";

const DetailCard = (props) => {

    return (
        <>
            <div>
                <div>
                    <img src="../favicon.ico" />
                </div>
                <div>
                    <p>작성자{props.post.author}</p>
                    <p>내용{props.post.content}</p>
                </div>
            </div>
        </>
    );
};

export default DetailCard;