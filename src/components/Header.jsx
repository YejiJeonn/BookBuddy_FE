import React from "react";
import BookSearch from "./BookSearch";
import MenuBar from "./MenuBar";


const styles = {
    header: {
        backgroundImage: 'linear-gradient(to bottom right, #FFAB2E, #FFD873)', // background-image -> backgroundImage
        width: '100%',
        height: 60,
        display: 'flex', // display: flex -> display: 'flex'
        alignItems: 'center', // align-items: center -> alignItems: 'center'
        justifyContent: 'center', // justify-content: center -> justifyContent: 'center'
        position: 'relative', // position: relative -> position: 'relative'
    },

    title: {
        margin: 0,
    },

    menuBar: {
        position: 'absolute',
        left: 10,
    },

    search: {
        position: 'absolute',
        right: 10,
    },

    txtSearch: {
        width: 200,
        height: 30,
    },
    titleName: {
        textDecoration: 'none',
        color: 'black',
    }
};

const Header = () => {

    return (
        <div style={styles.header}>
            <div style={styles.menuBar}>
                <MenuBar/>
            </div>

            <a href="/" style={styles.titleName}>
                <h1 style={styles.title}>Book Buddy</h1>
            </a>

            <div style={styles.search}>
                <BookSearch/>
            </div>
        </div>
    );
}

export default Header; // 대문자로 시작하는 컴포넌트 이름
