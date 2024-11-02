import {useState} from "react";
import axios from "axios";


const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const searchBooks = async () => {
        try{
            const response = await axios.get("http://localhost:8080/api/search-books", {
                params: {query: query},
            });
            setBooks(response.data.documents);
        } catch (error) {
            console.error("Error fetching books:", error);
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

            <button onClick={searchBooks}>검색</button>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>{book.title} - {book.authors.join(", ")}</li>
                ))}
            </ul>
        </div>
    );
}

export default BookSearch;