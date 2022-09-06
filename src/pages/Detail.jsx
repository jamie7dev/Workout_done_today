// 상세
import { useParams } from "react-router-dom";
import useFetchPost from "../components/Detail/useFetchPost";
import Header from "../components/Header/Header";
import DetailCard from "../components/Detail/DetailCard";

const Detail = () => {
    const params = useParams();
    const postId = parseInt(params.id);
    const data = useFetchPost(postId);

    return (
        <main>
            <Header />

            {data && (
                <DetailCard post={data} />
            )}
        </main>
    );
};

export default Detail;