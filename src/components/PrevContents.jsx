import React from "react";

const category = {
    1 : {id: "bestseller", title: "베스트셀러"},

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