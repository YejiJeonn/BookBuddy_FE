import React, {useState} from "react";
import "../styles/CssBtnToggle.scss";
import axios from "axios";

const BtnToggle = ({userId, nickname, isbn13, title}) => {
    const [isOn, setIsOn] = useState(false);

    const toggleHandler = async () => {
        try {
            if (!isOn) {
                // DB에 회원 id와 도서 isbn 저장
                const response = await axios.post("/api/book-history", {
                    userId: userId,
                    nickname: nickname,
                    title: title,
                    isbn: isbn13,
                });
                console.log("도서가 저장되었습니다: ", response.data);
            } else {
                // DB에서 회원 id와 도서 isbn 삭제
                const response = await axios.delete(`/api/book-history/${userId}/${isbn13}`);
                console.log("도서가 삭제되었습니다: ", response.data);
            }
            setIsOn(!isOn);
        } catch (error) {
            console.error(error.response?.data?.message || "오류가 발생했습니다.");
        }
    };

    return (
        <div className="toggle-wrapper">
            <div
                className={`toggle-container ${isOn ? "checked" : ""}`}
                onClick={toggleHandler}
            >
                <div className="toggle-track"></div>
                <div className="toggle-circle"></div>
            </div>
            <div className="desc">
                {/*{isOn ? "읽은 도서" : ""}*/}
                읽은 도서
            </div>
        </div>
    );
};

export default BtnToggle;
