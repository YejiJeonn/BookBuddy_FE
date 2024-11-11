import React, {useContext, useState} from "react";
import {MenuData} from "./menuData";
import './CssMenuBar.scss';
import icMenu from "../assets/icMenu.png";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function MenuBar() {
    const [isOpen, setIsOpen] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    // const [userInfo, setUserInfo] = useState(null); // 사용자 정보 관리
    const {user, setUser} = useContext(AuthContext);    // AuthContext에서 user 정보 가져오기
    const navigate = useNavigate();


    const handleMouseClick = () => {
        setIsOpen(prevState => !prevState);
    };

    // const handleMouseLeave = () => {
    //     setIsHovered(false);
    // };

    // const onLoginSuccess = (user) => {
    //     setIsLoggedIn(true);
    //     setUserInfo(user);
    // };

    // const handleLogin = () => {
    //     navigate("/login");
    // };

    const handleLogout = () => {
        // setIsLoggedIn(false);
        // setUserInfo(null);
        // 로그아웃 시 로컬 스토리지에서 토큰 제거 및 사용자 정보 초기화
        localStorage.removeItem('accessToken');
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
                                            <span>{user.name} 님</span>
                                        </a>
                                        <hr className="menuLine"/>
                                    </li>
                                );
                            }

                            if (!user) {
                                return (
                                    <li key={list.id} className="menuList">
                                        <a
                                            href="/login"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                user ? handleLogout() : navigate("/login");
                                            }}
                                        >
                                            {user ? "로그아웃" : list.menu}
                                        </a>
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
