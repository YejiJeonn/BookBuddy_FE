import {useEffect, useState} from "react";
import axios from "axios";
import './CssBookList.scss'
import {Link} from "react-router-dom";


function BLBestseller() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const apiKey = process.env.REACT_APP_ALADIN_API_KEY;    // .env 파일의 API 키를 가져옴
        const url = "http://www.aladin.co.kr/ttb/api/ItemList.aspx";

        try {
            const response = await axios.get(url, {
                params: {
                    ttbkey: apiKey,
                    QueryType: "Bestseller",
                    MaxResults: 5,
                    Cover: "Big",
                    Output: "JS",
                    Version: "20131101",
                },
            });
            setBooks(response.data.item);   // 응답 데이터에서 item 배열만 상태에 저장
        } catch (error) {
            console.error("Error fetching books: ", error);
        }
    };

    return (
        <div>
            <div className="bookWrap">
                {books.map((book) => (
                    <div className="itemId" key={book.itemId}>
                        <Link to={`/book/${book.itemId}`}>
                            <img className="bookImg" src={book.cover} alt={book.title}/>
                        </Link>
                        <Link to={`/book/${book.itemId}`} className="bookTitle">
                            <p>{book.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default BLBestseller;