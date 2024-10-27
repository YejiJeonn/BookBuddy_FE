// CheckDuplicateButton.js
import React from 'react';

const CheckDuplicateButton = ({ userId, onCheckDuplicate }) => {
    const handleClick = () => {
        if (userId) {
            onCheckDuplicate(userId); // 부모 컴포넌트로부터 전달받은 함수 실행
        } else {
            alert("아이디를 입력하세요.");
        }
    };

    return (
        <button onClick={handleClick}>
            중복확인
        </button>
    );
};

export default CheckDuplicateButton;
