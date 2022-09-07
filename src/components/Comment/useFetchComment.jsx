import { useEffect, useState } from "react";
import axios from "axios";

/**
 * `/post/1`과 같이 postId가 있다면 값을 주고, react key
 * 정서님이 개발하시는 컴포넌트와 같이 postId가 없는 경우, null을 지정해주면 됩니다.
 * @param {*} postId
 *                  
 * @returns 
 */
const useFetchComment = (postId) => {
    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        const URL = `http://3.38.192.170:8080/api/comment/${postId}`;
        const response = await axios.get(URL).catch(error => console.log(error));

        setPost(response.data.data);
        console.log("response is", response);
    };

    useEffect(() => {
        fetchPost();
    }, []);

    return post;
}



export default useFetchComment;