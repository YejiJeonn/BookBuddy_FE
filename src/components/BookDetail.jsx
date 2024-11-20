import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import BtnToggle from "./BtnToggle";
import '../styles/CssBookDetail.scss'
import PrevPost from "./PrevPost";

const BookDetail = () => {
    const {bookIsbn} = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookDetail();
    }, [bookIsbn]);

    // 비동기 함수를 정의하고 즉시 호출하는 방식 사용
    const fetchBookDetail = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/book-detail", {
                params: {itemId: bookIsbn} // itemId가 정확히 지정되었는지 확인
            });
            setBook(response.data.item[0] || null);
        } catch (error) {
            console.error("Error fetching book details:", error);
            setError("도서 데이터를 불러올 수 없습니다.");
        }
    };

    const handleShowDetail = (bookIsbn) => {
        navigate(`/posts/${bookIsbn}`);
    };

    return (
        <div>
            <h2>{book?.title}</h2>
            {error && <p>{error}</p>}
            <div className="container">
                <img src={book?.cover} alt={book?.title} style={{width: "300px"}}/>

                <div>
                    <BtnToggle/>
                    <div>
                        <button onClick={() => handleShowDetail(book?.isbn13)}>더보기</button>
                        <PrevPost/>
                    </div>
                </div>
            </div>
            <div className="detailContent">
                <p><strong>저자: </strong> {book?.author}</p>
                <p><strong>출판사: </strong> {book?.publisher}</p>
                <p><strong>출판일: </strong> {book?.pubDate}</p>
                <p><strong>회원 리뷰 평점: </strong> {book?.customerReviewRank}</p>
                <p><strong>설명: </strong> {book?.description}</p>
            </div>
        </div>
    );
}

export default BookDetail;
