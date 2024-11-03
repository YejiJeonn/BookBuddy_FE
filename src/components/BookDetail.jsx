import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function BookDetail() {
    const {id} = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        // 비동기 함수를 정의하고 즉시 호출하는 방식 사용
        const fetchBookDetail = async () => {
            const apiKey = process.env.REACT_APP_ALADIN_API_KEY;
            const url = "http://www.aladin.co.kr/ttb/api/ItemList.aspx";

            try {
                const response = await axios.get(url, {
                    params: {
                        ttbkey: apiKey,
                        itemIdType: "ItemId",
                        ItemId: id,
                        Cover: "Big",
                        Output: "Js",
                        Version: "20131101",
                    },
                });
                setBook(response.data.item[0]);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBookDetail();
    }, [id]);

    if (!book) return <p>Loading...</p>;

    return (
        <div style={{padding: "20px"}}>
            <h2>{book.title}</h2>
            <img src={book.cover} alt={book.title} style={{width: "300px"}}/>
            <p><strong>저자: </strong> {book.author}</p>
            <p><strong>출판사: </strong> {book.publisher}</p>
            <p><strong>출판일: </strong> {book.pubDate}</p>
            <p><strong>설명: </strong> {book.description}</p>
        </div>
    );
}

export default BookDetail;
