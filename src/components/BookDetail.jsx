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
    const [isBookSaved, setIsBookSaved] = useState(false); // 토글 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookDetail();
        checkIfBookExists();
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

    // 저장 여부 확인
    const checkIfBookExists = async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await axios.get("http://localhost:8080/api/library/books", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 응답에서 현재 도서 ISBN이 존재하는지 확인
            const exists = response.data.some((savedBook) => savedBook.isbn === bookIsbn);
            setIsBookSaved(exists); // 저장 여부 설정
        } catch (error) {
            console.error("Error checking book existence:", error);
        }
    };

    // 타이머 페이지 이동
    const navigateToTimer = () => {
        navigate('/timer', {
            state: {
                bookTitle: book?.title,
                bookIsbn: book?.isbn13,
                bookCover: book?.cover,
            },
        });
    };

    return (
        <div>
            {error && <p>{error}</p>}

            <div className="bdContainer">
                <img src={book?.cover} alt={book?.title} className="bookImg"/>

                <div className="bdContent">
                    <div className="titleNbtn">
                        <h2 className="bdTitle">{book?.title}</h2>
                        <div className="btnToggle">
                            <BtnToggle isbn13={book?.isbn13} title={book?.title} author={book?.author}
                                       publisher={book?.publisher} pubDate={book?.pubDate} cover={book?.cover}
                                       initialIsOn={isBookSaved} // 저장 여부 전달
                            />
                        </div>
                    </div>

                    <div className="detailContent">
                        <p style={{marginTop: '50px'}}><strong className="conTitle">저자</strong> <br/> {book?.author}</p>
                        <p><strong className="conTitle">출판사</strong> <br/> {book?.publisher}</p>
                        <p><strong className="conTitle">출판일</strong> <br/> {book?.pubDate}</p>
                        <p><strong className="conTitle">회원 리뷰 평점</strong> <br/> {book?.customerReviewRank}</p>
                        <p style={{maxWidth: '75ch'}}><strong className="conTitle">설명</strong>
                            <br/> {book?.description}</p>
                    </div>
                </div>
            </div>

            <button onClick={navigateToTimer} className="timerButton">타이머 시작</button>
            <h1 className="dbPostTitle">도서 게시판</h1>
            <div className="detailPost">
                <PrevPost bookIsbn={book?.isbn13}/>
            </div>

            <h1 className="dbPostTitle">도서 게시판</h1>
            <div className="detailPost">
                <div>
                    <PrevPost bookIsbn={book?.isbn13}/>
                </div>
            </div>
        </div>
    );
}

export default BookDetail;
