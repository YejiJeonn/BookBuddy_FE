import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

const SearchPage = () => {

    // const {search} = useLocation();
    const [searchParams] = useSearchParams();
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1); // 페이지 번호 상태 추가
    const [error, setError] = useState(null);
    const booksPerPage = 5;

    const query = searchParams.get("query");


    useEffect(() => {
        if (query) {
            fetchBooks(query, page);
        }
    }, [query, page]);

    // const fetchBooks = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:8080/api/search", {
    //             params: {query: query},
    //         });
    //         setBooks(response.data.documents);
    //     } catch (error) {
    //         console.error("Error fetching books:", error);
    //         setError(e.getError() || "도서 데이터를 불러오지 못했습니다.");
    //     }
    // };

    const fetchBooks = async (searchQuery, currentPage) => {
        try {
            const response = await axios.get("http://localhost:8080/api/search", {
                params: {
                    query: searchQuery,
                    maxResults: 15,
                    start: (currentPage - 1) * booksPerPage + 1,
                },
            });

            console.log(response.data.item);
            setBooks(response.data.item || []);
        } catch (err) {
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

    return (
        <div>
            <h1>검색 결과</h1>
            {error && <p>{error}</p>}
            <div className="bookListContainer">
                {books.map((book) => (
                    <div key={book.itemId} className="bookItem">
                        <img src={book.cover} alt={book.title} className="bookImage"/>
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                    </div>
                ))}
            </div>

            <div className="paginationButtons">
                <button onClick={handlePreviousPage} disabled={page === 1}>이전</button>
                <span>페이지 {page}</span>
                <button onClick={handleNextPage}>다음</button>
            </div>
        </div>
    )
        ;

}

export default SearchPage;