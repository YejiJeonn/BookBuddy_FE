import React from "react";
import BookSearch from "./BookSearch";
import MenuBar from "./MenuBar";
import icBookBuddy from "../assets/icBookBuddy.png";
import "../styles/CssHeader.scss";

const Header = () => {

    return (
        <div className="hContainer">
            <div className="headerContent">
                <a href="/" className="titleName">
                    <button className="icBookBuddy" style={{backgroundImage: `url(${icBookBuddy})`}}/>
                    <h1 className="title">Book Buddy</h1>
                </a>

                <div className="search">
                    <BookSearch/>
                </div>

                <div className="menuIcon">
                    <MenuBar/>
                </div>
            </div>
        </div>
    );
}

export default Header; // 대문자로 시작하는 컴포넌트 이름
