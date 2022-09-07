// 상세
import { useParams } from "react-router-dom";
import useFetchPost from "../components/Detail/useFetchPost";
import Header from "../components/Header/Header";
import DetailCard from "../components/Detail/DetailCard";
import Comment from "../components/Comment/Comment";


const Detail = () => {
    const params = useParams();
    const postId = parseInt(params.id);
    const data = useFetchPost(postId);

    // console.log(data);
    return (
        <main>
            <Header />

            {data && (
                <DetailCard post={data} />
            )}
            {data && (
                <Comment post={params} />
            )}
        </main>
    );
};

export default Detail;