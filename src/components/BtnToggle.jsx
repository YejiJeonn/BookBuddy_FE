import React, {useEffect, useState} from "react";
import "../styles/CssBtnToggle.scss";
import axios from "axios";

const BtnToggle = ({isbn13, title, author, publisher, pubDate, cover}) => {
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        const checkIfBookExists = async () => {
            const token = localStorage.getItem("accessToken");
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/library/check/${isbn13}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data.exists) {
                    setIsOn(true); // 도서가 이미 저장된 경우 버튼 활성화
                }
            } catch (error) {
                console.error(error.response?.data?.message || "오류가 발생했습니다.");
            }
        };

        checkIfBookExists();
    }, [isbn13]);

    const toggleHandler = async () => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        const nickname = localStorage.getItem('nickname');
        console.log("1" + token);
        console.log("isbn" + isbn13);

        try {
            if (!isOn) {
                // DB에 회원 id와 도서 isbn 저장
                const response = await axios.post("http://localhost:8080/api/library/save", {
                    userId: userId,
                    nickname: nickname,
                    title: title,
                    isbn: isbn13,
                    author: author,
                    publisher: publisher,
                    pubDate: pubDate,
                    cover: cover,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("도서가 저장되었습니다: ", response.data);
            } else {
                // DB에서 회원 id와 도서 isbn 삭제
                const response = await axios.delete(`/api/library/delete/${isbn13}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
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
