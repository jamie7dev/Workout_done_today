// 상세
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import DetailCard from "../components/Detail/DetailCard";
import Comment from "../components/Comment/Comment";

const Detail = () => {
    const params = useParams();

    return (
        <main>
            <Header />
            <DetailCard />

            <Comment post={params} />
        </main>
    );
};

export default Detail;