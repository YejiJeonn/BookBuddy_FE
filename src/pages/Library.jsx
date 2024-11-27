import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const Library = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");

    // 도서 데이터 가져오기
    const fetchBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/library/books`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); // 백엔드 API 호출
            setBooks(response.data); // 가져온 데이터를 상태에 저장
        } catch (err) {
            console.error("Error fetching books:", err);
            setError("도서 데이터를 불러오는 데 실패했습니다."); // 에러 처리
        }

        console.log(books[0]);
    };

    useEffect(() => {
        fetchBooks(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, []);

    const handleShowDetail = (isbn13) => {
        navigate(`/book-detail/${isbn13}`);
    };

    return (
        <div className="card-list">
            <h1>내 서재 페이지</h1><br/>
            {error && <p className="error">{error}</p>} {/* 에러 메시지 표시 */}
            {books.map((book) => (
                <div className="card" key={book.isbn13} onClick={() => handleShowDetail(book.isbn13)}>
                    <img
                        src={book.cover} // API 호출을 통해 받아온 cover 이미지
                        alt={book.title || "No Title"}
                        className="book-cover"
                    />
                    <div className="card-content">
                        <h3 className="book-title">{book.title || "제목 없음"}</h3>
                        <p><strong>저자:</strong> {book.author || "저자 미상"}</p>
                        <p><strong>출판사:</strong> {book?.publisher || "출판사 정보 없음"}</p>
                        <p>
                            <strong>출판일:</strong> {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : "출판일 정보 없음"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Library;
