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
            // 수정할 게시글 정보 불러오기
            fetchPostDetails();
        }
    }, [postId]);

    const fetchPostDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
            const post = response.data;
            setTitle(post.title);
            setContent(post.content);
        } catch (error) {
            console.error("Error fetching post details:", error);
        }
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        const today = new Date();
        const createDate = today.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        e.preventDefault();

        try {
            if (postId) {
                //게시글 수정
                await axios.put(
                    `http://localhost:8080/api/posts/update/${postId}`, {
                        userId: userId,
                        title: title,
                        content: content,
                        nickname: author,
                        isbn: bookIsbn,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                console.log("Post updated");
            } else {
                // 게시글 작성
                const response = await axios.post(
                    "http://localhost:8080/api/posts/write", {
                        userId: userId,
                        title: title,
                        content: content,
                        nickname: author,
                        isbn: bookIsbn,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                );
                console.log("Post added: ", response.data);

                // 부모 컴포넌트에서 목록 갱신
                if (onPostAdded) onPostAdded(response.data);
            }

            // 입력 필드 초기화
            setTitle("");
            setContent("");
            // navigate(`/book/${bookIsbn}/posts`);
            navigate(`/posts/${bookIsbn}`);
        } catch (error) {
            console.error("Error adding post or updating post :", error);
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
