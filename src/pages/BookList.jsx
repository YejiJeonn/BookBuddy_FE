import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import '../components/CssBookList.scss'

const categories = [
    {id: "ItemNewAll", title: "신간 전체"},
    {id: "ItemNewSpecial", title: "주목할 만한 신간"},
    {id: "ItemEditorChoice", title: "편집자 추천 리스트"},
    {id: "bestseller", title: "베스트셀러"},
];

function BookList() {
    const [bookData, setBookData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        categories.forEach((category) => {
            fetchPreviewBooks(category.id);
        });
    }, []);

    // 알라딘 api에서 카테고리별로 도서 5개만 불러오기
    const fetchPreviewBooks = async (categoryId) => {
        const apiKey = process.env.REACT_APP_ALADIN_API_KEY;
        const url = "https://www.aladin.co.kr/ttb/api/ItemList.aspx";

        try {
            const response = await axios.get(url, {
                params: {
                    ttbkey: apiKey,
                    QueryType: categoryId,
                    MaxResults: 5,       // 미리보기용 5개 데이터만 가져옴
                    Cover: "Big",
                    Output: "JS",
                    Version: "20131101",
                },
            });
            setBookData((prevData) => ({
                ...prevData,
                [categoryId]: response.data.item,
            }));
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div>
            {categories.map((category) => (
                <div key={category.id} style={{marginBottom: "20px"}}>
                    {/* 카테고리명 */}
                    <h1
                        style={{cursor: "pointer"}}
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        {category.title}
                    </h1>

                    {/* 더보기 버튼 */}
                    <Link to={`/category/${category.id}`} style={{color: "blue", textDecoration: "underline"}}>
                        더보기
                    </Link>


                    {/* 해당 카테고리 도서 영역설정 */}
                    <div
                        className="bgBookList"
                    >
                        {/* 5개의 도서 미리보기 */}
                        {bookData[category.id]?.map((book) => (
                            <div key={book.itemId} style={{margin: "10px"}}>
                                <img src={book.cover} alt={book.title} style={{width: "100px"}}/>
                                <p style={{maxWidth: "100px", textAlign: "center"}}>{book.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BookList;
