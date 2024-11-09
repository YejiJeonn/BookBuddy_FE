import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const BookDetail = () => {
    const {bookIsbn} = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookDetail();
    }, [bookIsbn]);

    // 비동기 함수를 정의하고 즉시 호출하는 방식 사용
    const fetchBookDetail = async () => {
        try {
            console.log("book" + bookIsbn);

            const response = await axios.get("http://localhost:8080/api/book-detail", {
                params: {itemId: bookIsbn} // itemId가 정확히 지정되었는지 확인
            });
            console.log("book" + bookIsbn);
            console.log(response.data);
            setBook(response.data.item[0] || null);
        } catch (error) {
            console.error("Error fetching book details:", error);
            setError("도서 데이터를 불러올 수 없습니다.");
        }
    };

    return (
        <div style={{padding: "20px"}}>
            <h2>{book?.title}</h2>
            {error && <p>{error}</p>}
            <img src={book?.cover} alt={book?.title} style={{width: "300px"}}/>
            <p><strong>저자: </strong> {book?.author}</p>
            {/*<p><strong>출판사: </strong> {book.publisher}</p>*/}
            {/*<p><strong>출판일: </strong> {book.pubDate}</p>*/}
            <p><strong>설명: </strong> {book?.description}</p>
        </div>
    );
}

export default BookDetail;
