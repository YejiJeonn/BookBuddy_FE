import {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../styles/CssBookSearch.scss';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const searchBooks = () => {
        if (query) {
            navigate(`/searchpage?query=${query}`);
        }
    };

    return (
        <div className="searchContainer">
            {/* 검색 입력 필드 */}
            <input
                className="bookSearchText"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색할 도서 제목"
            />

            {/* 검색 버튼 */}
            <button
                className="searchButton"
                onClick={searchBooks}
            >
                검색
            </button>
        </div>
    );
}

export default BookSearch;