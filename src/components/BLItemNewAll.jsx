import React, {useEffect, useState} from "react";
import '../components/CssBookList.scss'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const BLItemNewAll = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const category = {id: "ItemNewAll", title: "신간 전체"};

    useEffect(() => {
        fetchProducts();
    }, []);

    // Spring Boot API에서 상품 데이터 가져오기
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/aladin-books", {
                params: {
                    queryType: category.id, // 카테고리 예시: Bestseller
                    maxResults: 5            // 가져올 최대 상품 수
                }
            });

            console.log(response.data)
            setProducts(response.data.item || []); // API 응답에서 상품 데이터 설정
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("상품 데이터를 불러오지 못했습니다.");
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div>
            <div className="headerContainer">
                <h1>{category.title}</h1>
                <button
                    onClick={() => handleCategoryClick(category.id)}
                    className="btnMore"
                >
                    더보기
                </button>
            </div>

            {error && <p>{error}</p>}
            {/* 해당 카테고리 도서 영역설정 */}
            <div className="bookListContainer">
                {products.map((product) => (
                    <div key={product.itemId} className="bookItem">
                        <img src={product.cover} alt={product.title} className="bookImage"/>
                        <h3>{product.title}</h3>
                        <p>{product.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BLItemNewAll;
