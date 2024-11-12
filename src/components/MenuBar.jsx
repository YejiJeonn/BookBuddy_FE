import React, {useContext, useEffect, useState} from "react";
import {MenuData} from "./menuData";
import './CssMenuBar.scss';
import icMenu from "../assets/icMenu.png";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function MenuBar() {
    const [isOpen, setIsOpen] = useState(false);
    const {user, setUser} = useContext(AuthContext);    // AuthContext에서 user 정보 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        // 페이지 로드 시 localStorage에서 사용자 정보 가져오기
        const savedUser = localStorage.getItem("nickName");
        if (savedUser) {
            setUser(savedUser); // 사용자 정보로 상태 초기화
        }
    }, [setUser]);


    const handleMouseClick = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        // setIsLoggedIn(false);
        // setUserInfo(null);
        // 로그아웃 시 로컬 스토리지에서 토큰 제거 및 사용자 정보 초기화
        localStorage.removeItem('accessToken');
        localStorage.removeItem('nickName');
        setUser(null);
        navigate("/login");
    };


    return ( // return 문 추가
        <nav className="nav">
            <div className="menuWrapper">

                <button
                    className="btn-img"
                    onClick={handleMouseClick}
                    style={{backgroundImage: `url(${icMenu})`}}
                />

                {isOpen && (
                    <ul
                        className="menuLists"
                        // onMouseEnter={handleMouseEnter}  // menuLists에 마우스가 올라갈 때 유지
                        // onMouseLeave={handleMouseLeave}  // menuLists에서 마우스가 떠날 때 상태 해제
                    >
                        {MenuData.map((list) => {

                            // 메뉴 동적 업데이트
                            if (list.menu === "프로필" && user) {
                                return (
                                    <li key={list.id} className="menuList">
                                        <a href="/profile">
                                            <span>{user} 님</span>
                                        </a>
                                        <hr className="menuLine"/>
                                    </li>
                                );
                            }

                            if (list.menu === "로그인" && user) {
                                return (
                                    <li key={list.id} className="menuList">
                                        <div onClick={handleLogout}>
                                            <span>로그아웃</span>
                                        </div>
                                        <hr className="menuLine"/>
                                    </li>
                                );
                            }


                            return (
                                <React.Fragment key={list.id}>
                                    <li className="menuList">
                                        <a href={list.url || "#"}>
                                            {list.menu}
                                        </a>
                                    </li>
                                    <hr className="menuLine"/>
                                </React.Fragment>
                            )
                        })}
                        {/*{MenuData.map(list => (*/}
                        {/*    <React.Fragment key={list.id}>*/}
                        {/*        <a href={list.url || "#"}>*/}
                        {/*            <li className="menuList">*/}
                        {/*                {list.menu}*/}
                        {/*            </li>*/}
                        {/*        </a>*/}
                        {/*        <hr className="menuLine"/>*/}
                        {/*    </React.Fragment>*/}
                        {/*))}*/}
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default MenuBar;
