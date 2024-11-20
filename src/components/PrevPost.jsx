import {useEffect, useState} from "react";
import "../styles/CssPrevPost.scss";
import axios from "axios";

const PrevPost = () => {
    const [posts, setPosts] = useState([]); // 게시글 목록
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여줄 게시글의 인덱스
    const [isLoading, setIsLoading] = useState(true);

    // 최근 게시글 5개를 서버에서 가져오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/posts/recent?limit=5');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching recent posts:', error);
            } finally {
                setIsLoading(false);    // 로딩 완료
            }
        };

        fetchPosts();
    }, []);

    // 이전 게시글로 이동
    const handlePrevClick = () => {
        if (posts.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
        }
    };

    // 다음 게시글로 이동
    const handleNextClick = () => {
        if (posts.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
        }
    };

    return (
        <div className="prev-post-slider">
            {isLoading ? (
                <p>게시글을 불러오는 중입니다.</p>
            ) : posts.length > 0 ? (
                <div className="post-container">
                    <h3>{posts[currentIndex].title}</h3>
                    <p>{posts[currentIndex].content}</p>
                    <div className="navigation">
                        <button onClick={handlePrevClick}>이전</button>
                        <button onClick={handleNextClick}>다음</button>
                    </div>
                </div>
            ) : (
                <p>게시글이 없습니다.</p>
            )}
        </div>
    );
};


export default PrevPost;