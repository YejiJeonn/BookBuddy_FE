import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/CssPostList.scss"
import {useNavigate, useParams} from "react-router-dom";

const PostListPage = () => {
    const {bookIsbn} = useParams();
    const [posts, setPosts] = useState([]); // 게시글 상태 저장
    const [error, setError] = useState(null); // 에러 상태 저장
    const navigate = useNavigate();
    const nickname = localStorage.getItem('nickname');

    useEffect(() => {
        if (bookIsbn) {
            fetchPosts();
        } else {
            console.error("ISBN이 존재하지 않습니다.");
        }
    }, [bookIsbn]);


    // 게시글 데이터 가져오기
    const fetchPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/${bookIsbn}`); // 백엔드 API 호출
            setPosts(response.data); // 가져온 데이터를 상태에 저장
        } catch (err) {
            console.error("Error fetching posts:", err);
            setError("게시글 데이터를 불러오는 데 실패했습니다."); // 에러 처리
        }
    };

    // 게시글 삭제
    const handleDelete = async (postId, postNickname) => {
        const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("accessToken");
        if (nickname === postNickname) {
            try {
                await axios.delete(`http://localhost:8080/api/posts/delete/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // 삭제 후 게시글 목록 갱신
                setPosts(posts.filter(post => post.id !== postId));     // 삭제된 postId를 제외
            } catch (err) {
                console.error("Error deleting post:", err);
                setError("게시글 삭제에 실패했습니다.");
            }
        } else {
            alert("작성자만 수정할 수 있습니다.");
            return 0;
        }
    };

    // 게시글 수정 페이지로 이동
    const handleEdit = (postId, postNickname) => {
        if (nickname === postNickname) {
            navigate(`/book/${bookIsbn}/posts/edit/${postId}`);
        } else {
            alert("작성자만 수정할 수 있습니다.");
            return 0;
        }
    };

    // 게시글 작성 페이지로 이동
    const handleWritePost = () => {
        navigate(`/book/${bookIsbn}/posts/write`);
    };


    return (
        <div>
            <h1 className="postListTitle">게시글 목록</h1>
            <div className="containerBtnPostList">
                <button className="btnPostList" onClick={handleWritePost}>글쓰기</button>
            </div>

            {/* 에러 메시지 표시 */}
            {/*{error && <p style={{color: "red"}}>{error}</p>}*/}

            {/* 게시글 리스트 */}
            <div className="postList">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="postItem">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <small>
                                작성자: {post.nickname} | 작성일: {post.createAt}
                            </small>
                            <div className="postActions">
                                <button onClick={() => handleEdit(post.id, post.nickname)}>수정</button>
                                <button onClick={() => handleDelete(post.id, post.nickname)}>삭제</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>게시글이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default PostListPage;
