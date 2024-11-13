import React, {useEffect, useState} from "react";
import '../components/CssBookList.scss';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PrevContents = ({category}) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, [category.id]);

    // Spring Boot API에서 상품 데이터 가져오기
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/aladin-books", {
                params: {
                    queryType: category.id,
                    maxResults: 5,
                    start: 1
                }
            });
            setProducts(response.data.item || []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("상품 데이터를 불러오지 못했습니다.");
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    const handleShowDetail = (bookIsbn) => {
        navigate(`/book-detail/${bookIsbn}`);
    };

    return (
        <div>
            <div className="headerContainer">
                <h1 style={{marginLeft: "20px"}}>{category.title}</h1>
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

                    <div key={product.isbn13} onClick={() => handleShowDetail(product.isbn13)}>
                        <div className="bookItem">
                            <img src={product.cover} alt={product.title} className="bookImage"/>
                            <h3>{product.title}</h3>
                            <p>{product.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrevContents;
