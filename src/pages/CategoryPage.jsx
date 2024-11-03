import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function CategoryPage() {
    const {categoryId} = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {

        const fetchBooks = async () => {
            const apiKey = process.env.REACT_APP_ALADIN_API_KEY;
            const url = "https://www.aladin.co.kr/ttb/api/ItemList.aspx";

            try {
                const response = await axios.get(url, {
                    params: {
                        ttbkey: apiKey,
                        QueryType: categoryId,
                        MaxResults: 50,  // 전체 데이터 가져오기
                        Cover: "Big",
                        Output: "JS",
                        Version: "20131101",
                    },
                });
                setBooks(response.data.item);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [categoryId]);

    return (
        <div>
            <h2>{categoryId === "ItemNewAll" ? "신간 전체" :
                categoryId === "ItemNewSpecial" ? "주목할 만한 신간" :
                    categoryId === "ItemEditorChoice" ? "편집자 추천 리스트" : "베스트셀러"}</h2>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {books.map((book) => (
                    <div key={book.itemId} style={{margin: "10px"}}>
                        <img src={book.cover} alt={book.title} style={{width: "150px"}}/>
                        <p style={{maxWidth: "150px", textAlign: "center"}}>{book.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;
