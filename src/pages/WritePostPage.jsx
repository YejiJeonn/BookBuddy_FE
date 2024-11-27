import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/CssWritePost.scss"
import {useNavigate, useParams} from "react-router-dom";

const WritePostPage = ({onPostAdded}) => {
    const {bookIsbn, postId} = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const author = localStorage.getItem('nickname');
    const navigate = useNavigate();

    useEffect(() => {
        if (postId) {
            // 게시글 수정 시 기존 데이터 불러오기
            fetchPostDetails();
        }
    }, [postId]);

    const fetchPostDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/detail/${postId}`);
            const post = response.data;

            // 기존 게시글 데이터 설정
            setTitle(post.title);
            setContent(post.content);
        } catch (error) {
            console.error("Error fetching post details:", error);
        }
    };

    // 게시글 작성 핸들러
    const handleCreate = async () => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');

        try {
            const response = await axios.post(
                "http://localhost:8080/api/posts/write",
                {
                    userId: userId,
                    title: title,
                    content: content,
                    nickname: author,
                    isbn: bookIsbn,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            console.log("Post added: ", response.data);

            // 부모 컴포넌트에서 목록 갱신
            if (onPostAdded) onPostAdded(response.data);

            // 입력 필드 초기화 후 목록 페이지로 이동
            setTitle("");
            setContent("");
            navigate(`/posts/${bookIsbn}`);
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    // 게시글 수정 핸들러
    const handleUpdate = async () => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');

        try {
            await axios.put(
                `http://localhost:8080/api/posts/update/${postId}`,
                {
                    userId: userId,
                    title: title,
                    content: content,
                    nickname: author,
                    isbn: bookIsbn,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Post updated");

            // 수정 완료 후 목록 페이지로 이동
            navigate(`/posts/${bookIsbn}`);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    // 제출 버튼 핸들러 (작성 또는 수정)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (postId) {
            handleUpdate();
        } else {
            handleCreate();
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>제목</label>
                <input
                    className="postTitle"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>내용</label>
                <textarea
                    className="postContent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>작성자</label>
                <span>{author} 님</span>
            </div>
            <button type="submit">{postId ? "수정 완료" : "등록"}</button>
        </form>
    );
};

export default WritePostPage;
