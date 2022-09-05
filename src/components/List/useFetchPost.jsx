import { useEffect, useState } from "react";
import axios from "axios";

/**
 * `/posts/1`과 같이 postId가 있다면 값을 주고, react key
 * 정서님이 개발하시는 컴포넌트와 같이 postId가 없는 경우, null을 지정해주면 됩니다.
 * @param {*} postId
 *                  
 * @returns 
 */
const useFetchPosts = (postId) => {
    const [posts, setPosts] = useState(null);

    const fetchPosts = async () => {
        const URL = postId !== null ? `http://localhost:3001/posts/${postId}` : `http://localhost:3001/posts`;
        const response = await axios.get(URL).catch(error => console.log(error));

        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return posts;
}

export default useFetchPosts;