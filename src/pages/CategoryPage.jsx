import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import '../components/CssCategoryPage.scss'

const CategoryPage = () => {
    const {categoryId} = useParams();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;  // 한 페이지에 표시할 항목 수
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategoryProducts(categoryId, currentPage);
    }, [categoryId, currentPage]);

    const fetchCategoryProducts = async (queryType, page) => {
        try {
            const start = (page - 1) * itemsPerPage + 1;  // 페이지에 맞게 시작 인덱스 설정
            const response = await axios.get("http://localhost:8080/api/aladin-books", {
                params: {queryType, maxResults: itemsPerPage, start}
            });
            setProducts(response.data.item || []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("상품 데이터를 불러오지 못했습니다.");
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleShowDetail = (bookIsbn) => {
        navigate(`/book-detail/${bookIsbn}`);
    };

    return (
        <div>
            <h1>{categoryId} 카테고리</h1>
            {error && <p>{error}</p>}
            <div className="bookListContainer">
                {products.map((product) => (
                    <div key={product.isbn13} className="bookItem" onClick={() => handleShowDetail(product.isbn13)}>
                        <img src={product.cover} alt={product.title} className="bookImage"/>
                        <h3>{product.title}</h3>
                        <p>{product.author}</p>
                    </div>
                ))}
            </div>
            {/* 페이지 네비게이션 버튼 */}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>이전</button>
                <span>페이지 {currentPage}</span>
                <button onClick={handleNextPage} disabled={products.length < itemsPerPage}>다음</button>
            </div>
        </div>
    );
};

export default CategoryPage;
