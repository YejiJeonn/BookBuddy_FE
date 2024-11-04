import React, {useCallback, useEffect, useState} from "react";
import '../components/CssBookList.scss'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const BLBestseller = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const category = {id: "bestseller", title: "베스트셀러"};

    useEffect(() => {
        fetchProducts();
    },);

    // Spring Boot API에서 상품 데이터 가져오기
    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/aladin-books", {
                params: {
                    queryType: "Bestseller", // 예시 카테고리
                    maxResults: 5,
                    start: 1
                }
            });
            setProducts(response.data.item || []);
        } catch (error) {
            setError(error);
            console.error("Error fetching products:", error);
        }
    }, []);  // 이 예시에서는 의존성이 없는 빈 배열

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

export default BLBestseller;
