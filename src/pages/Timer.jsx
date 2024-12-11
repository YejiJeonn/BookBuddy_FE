import React, {useState} from 'react';
import axios from 'axios';
import {useTimer} from './TimerContext';
import '../styles/CssTimer2.scss';
import {useLocation, useNavigate} from "react-router-dom";

const TimerPage = () => {
    const {
        isStopwatchRunning,
        setIsStopwatchRunning,
        stopwatchTime,
        setStopwatchTime,
    } = useTimer();

    const location = useLocation();
    const navigate = useNavigate();

    // URL로 전달된 도서 정보
    const {bookTitle: initialBookTitle, bookIsbn: initialBookIsbn, bookCover: initialBookCover} = location.state || {};

    const [bookTitle, setBookTitle] = useState(initialBookTitle || "");
    const [bookIsbn, setBookIsbn] = useState(initialBookIsbn || "");
    const [bookCover, setBookCover] = useState(initialBookCover || "");

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const booksPerPage = 5;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // 스톱워치 기능
    const toggleStopwatch = () => {
        setIsStopwatchRunning(!isStopwatchRunning);
        if (!isStopwatchRunning) {
            setStartTime(new Date()); // 시작 시간 설정
        } else {
            setEndTime(new Date()); // 종료 시간 설정
        }
    };

    const resetStopwatch = () => {
        setIsStopwatchRunning(false);
        setStopwatchTime(0);
        setStartTime(null);
        setEndTime(null);
    };

    const saveReadingTime = async () => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        const startDate = startTime ? startTime.toISOString() : null;
        const endDate = endTime ? endTime.toISOString() : null;

        const today = new Date();
        const createDate = today.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        if (!bookTitle) {
            alert("도서 제목을 입력해주세요.");
        } else {
            try {
                await axios.post("http://localhost:8080/api/save-reading-time", {
                    userId: userId,
                    createdAt: createDate,
                    startTime: startDate,
                    endTime: endDate,
                    bookTitle,
                    bookIsbn,
                    bookCover
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert("독서 시간이 저장되었습니다!");
            } catch (error) {
                console.error("Error saving reading time:", error);
                alert("로그인하고 이용해주세요.");
                navigate("/login");
            }
        }
    };

    // 검색 결과 가져오기
    const fetchBooks = async (searchQuery, currentPage) => {
        try {
            const response = await axios.get("http://localhost:8080/api/search", {
                params: {
                    query: searchQuery,
                    maxResults: 5,
                    start: (currentPage - 1) * booksPerPage + 1,
                },
            });
            setBooks(response.data.item || []);
        } catch (error) {
            console.error("Error fetching books:", error);
            alert("도서 검색에 실패했습니다.");
        }
    };

    // 검색어 입력 시 도서 검색
    const handleSearch = (e) => {
        e.preventDefault();
        fetchBooks(query, page);
    };

    // 도서 클릭 시 bookTitle 설정
    const handleBookClick = (title, bookIsbn, bookCover) => {
        setBookTitle(title);
        setBookIsbn(bookIsbn);
        setBookCover(bookCover);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="tcontent">
            {/*기록 측정 시 유의 사항*/}
            <div>
                <h2 className="hText">유의사항</h2>
                <p className="pText">
                    페이지 이동 시 진행된 타이머 혹은 스톱워치의 시간은 일시적으로 저장되지만<br/>
                    다시 시작하게되면 <strong>초기화</strong>됩니다. <br/>
                    독서 기록 중에는 페이지를 이동하지 마시고 독서에만 집중해주세요. <br/>
                    불가피하게 페이지를 이동하게 될 경우 하단의 <strong>'저장'</strong>버튼을 꼭 눌러주세요.
                </p>
            </div>

            <h1 className="hText">Stopwatch</h1>
            <div className="timerDisplay">
                <span>{formatTime(stopwatchTime)}</span>
            </div>
            <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="도서 제목"
                style={{marginBottom: "10px", padding: "5px"}}
                className="inputText"
            />
            <button
                onClick={toggleStopwatch}
                className={`tBtnS ${isStopwatchRunning ? "clicked" : ""}`} // 조건부 클래스
            >
                {!isStopwatchRunning ? 'Start' : 'Stop'}
            </button>
            <button onClick={resetStopwatch} className="tBtnR">
                Reset
            </button>

            <div style={{marginTop: '30px'}}>
                <button onClick={saveReadingTime} className="tBtnSave">
                    저장
                </button>
            </div>

            {/* 도서 검색 */}
            <div style={{marginTop: '30px'}}>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="검색어를 입력하세요"
                        className="inputText"
                    />
                    <button type="submit">검색</button>
                </form>

                <div className="bookListContainer">
                    {books.map((book) => (
                        <div key={book.itemId} className="tBookItem"
                             onClick={() => handleBookClick(book.title, book.isbn13, book.cover)}>
                            <img src={book.cover} alt={book.title} className="tBookImage"/>
                            <h3>{book.title}</h3>
                            <p className="pText">{book.author}</p>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={page === 1}>이전</button>
                    <span>페이지 {page}</span>
                    <button onClick={handleNextPage}>다음</button>
                </div>
            </div>
        </div>
    );
};

export default TimerPage;
