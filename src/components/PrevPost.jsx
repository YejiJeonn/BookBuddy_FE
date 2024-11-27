import React, {useEffect, useState} from "react";
import "../styles/CssPrevPost.scss";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PrevPost = ({bookIsbn}) => {
    const [posts, setPosts] = useState([]); // 게시글 목록
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 보여줄 게시글의 인덱스
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // 최근 게시글 5개를 서버에서 가져오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/posts/recent', {
                    params: {
                        limit: 5,
                        isbn: bookIsbn,
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching recent posts:', error);
            } finally {
                setIsLoading(false);    // 로딩 완료
            }
        };

        if (!bookIsbn || posts === null) {
            setIsLoading(true);
            return;
        }

        fetchPosts();
    }, [bookIsbn]);

    useEffect(() => {
        if (posts.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [posts]);


    const handleShowDetail = () => {
        navigate(`/posts/${bookIsbn}`);
    };


    return (
        <div>
            <button onClick={() => handleShowDetail()}>더보기</button>
            <div className="prev-post-slider" onClick={() => handleShowDetail()}>
                {isLoading ? (
                    <p className="loading-message">게시글을 불러오는 중입니다.</p>
                ) : posts.length > 0 ? (
                    <div className="post-container">
                        <div className="slider" style={{transform: `translateX(-${currentIndex * 100}%)`,}}>
                            {posts.map((post, index) => (
                                <div className="slide" key={index}>
                                    <h3 className="slide-title">{posts[currentIndex].title}</h3>
                                    <p className="slide-content">{posts[currentIndex].content}</p>
                                    <p className="slide-author">{posts[currentIndex].nickname}</p>
                                    <span className="index">- {currentIndex + 1} -</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>게시글이 없거나 도서의 ISBN이 존재하지 않습니다.</p>
                )}
            </div>
        </div>
    )
        ;
};


export default PrevPost;