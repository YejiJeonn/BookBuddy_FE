import React, {useEffect, useState} from "react";
import "../styles/CssBtnToggle.scss";
import axios from "axios";

const BtnToggle = ({isbn13, title, author, publisher, pubDate, cover, initialIsOn}) => {
    const [isOn, setIsOn] = useState(initialIsOn);

    useEffect(() => {
        setIsOn(initialIsOn); // prop 값에 따라 상태 업데이트
    }, [initialIsOn]);

    const toggleHandler = async () => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        const nickname = localStorage.getItem('nickname');

        try {
            if (!isOn) {
                // 도서 저장 요청
                await axios.post(
                    "http://localhost:8080/api/library/save",
                    {
                        userId,
                        nickname,
                        title,
                        isbn: isbn13,
                        author,
                        publisher,
                        pubDate,
                        cover,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("도서가 저장되었습니다.");
            } else {
                // 도서 삭제 요청
                await axios.delete(
                    `http://localhost:8080/api/library/delete/${isbn13}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("도서가 삭제되었습니다.");
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
