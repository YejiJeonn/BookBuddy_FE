import React, {useState} from "react";
import {MenuData} from "./menuData";
import './CssMenuBar.scss';
import icMenu from "../assets/icMenu.png";
import {useNavigate} from "react-router-dom";

function MenuBar() {
    const [isHovered, setIsHovered] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보 관리
    const navigate = useNavigate();


    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const onLoginSuccess = (user) => {
        setIsLoggedIn(true);
        setUserInfo(user);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserInfo(null);
    };


    return ( // return 문 추가
        <nav className="nav">
            <div className="menuWrapper">

                <button
                    className="btn-img"
                    onMouseEnter={handleMouseEnter}
                    style={{backgroundImage: `url(${icMenu})`}}
                />

                {isHovered ? (
                    <ul
                        className="menuLists"
                        onMouseEnter={handleMouseEnter}  // menuLists에 마우스가 올라갈 때 유지
                        onMouseLeave={handleMouseLeave}  // menuLists에서 마우스가 떠날 때 상태 해제
                    >
                        {MenuData.map((list) => {

                            // 메뉴 동적 업데이트
                            if (list.menu === "프로필" && isLoggedIn) {
                                return (
                                    <li key={list.id} className="menuList">
                                        <a href={isLoggedIn ? alert("로그인해주세요.") : list.url}>
                                            <span>{userInfo?.name} 님</span>
                                        </a>
                                        <hr className="menuLine"/>
                                    </li>
                                );
                            }

                            if (list.menu === "로그인") {
                                return (
                                    <li key={list.id} className="menuList">
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                isLoggedIn ? handleLogout() : navigate("/login");
                                            }}
                                        >
                                            {isLoggedIn ? "로그아웃" : list.menu}
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
                ) : null}
            </div>
        </nav>
    );
}

export default MenuBar;
