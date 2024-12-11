import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import "../styles/CssSearchPage.scss";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1); // 페이지 번호 상태 추가
    const [error, setError] = useState(null);
    const booksPerPage = 15;
    const navigate = useNavigate();

    const query = searchParams.get("query");


    // 직접 비동기 함수 호출하면 안됨 -> useEffect는 클린업 함수만 반환 가능
    // useEffect(async () => {
    //     if (query) {
    //         await fetchBooks(query, page);
    //     }
    // }, [query, page]);

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                await fetchBooks(query, page);
            }
        };
        fetchData();
    }, [query, page]);

    const fetchBooks = async (searchQuery, currentPage) => {
        try {
            const start = (page - 1) * booksPerPage + 1;
            const response = await axios.get("http://localhost:8080/api/search", {
                params: {
                    query: searchQuery,
                    maxResults: 15,
                    start: start
                },
            });

            setBooks(response.data.item || []);
        } catch (error) {
            console.error("Error fetching books:", error);
            setError("불러오지 못했습니다.");
        }
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleShowDetail = (bookIsbn) => {
        navigate(`/book-detail/${bookIsbn}`);
    };

    return (
        <div>
            <h1 className="searchTitle">검색 결과</h1>
            {error && <p>{error}</p>}
            <div className="sBookListContainer">
                {books.map((book) => (
                    <div key={book.isbn13} onClick={() => handleShowDetail(book.isbn13)} className="bookItem">
                        <img src={book.cover} alt={book.title} className="bookImage"/>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>이전</button>
                <span>페이지 {page}</span>
                <button onClick={handleNextPage}>다음</button>
            </div>
        </div>
    )
        ;

}

export default SearchPage;