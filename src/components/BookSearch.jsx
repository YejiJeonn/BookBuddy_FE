import {useState} from "react";
import {useNavigate} from "react-router-dom";


const BookSearch = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const searchBooks = () => {
        // 검색어를 SearchPage로 넘겨서 해당 페이지에서 도서 정보를 가져오도록 함
        if (query) {
            navigate(`/searchpage?query=${query}`);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색할 도서 제목"
            />

            {/* 검색 버튼 */}
            <button onClick={searchBooks}>검색</button>
        </div>
    );
}

export default BookSearch;