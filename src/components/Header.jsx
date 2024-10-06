import React,{useState} from "react";


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

    btnImg: {
        width: 30,
        height: 30,
        position: 'absolute', // position: absolute -> position: 'absolute'
        left: 10,
        background: `url('./icMenu.png') no-repeat center center`, // background -> background: `url('./icMenu.png') no-repeat center center`
        backgroundSize: 'cover', // background-size -> backgroundSize: 'cover'
        border: 'none', // border: none -> border: 'none'
        cursor: 'pointer', // cursor: pointer -> cursor: 'pointer'
        padding: 0,
    },

    btnImgHover: {
        transform: 'scale(1.1)',
    },

    title: {
        margin: 0,
    },

    search: {
        position: 'absolute',
        right: 10,
    },

    txtSearch: {
        width: 200,
        height: 30,
    },
};

function Header(props) {
    const [isHovered, setIsHovered] = useState(false);

    const imageButtonClicked = () => {
        console.log("버튼 클릭됨");
    };

    return (
        <div style={styles.header}>
            <button
                style={isHovered ? {...styles.btnImg, ...styles.btnImgHover} : styles.btnImg}
                onClick={imageButtonClicked}
                onMouseEnter={() => setIsHovered(true)} // 마우스를 버튼 위에 올렸을 때
                onMouseLeave={() => setIsHovered(false)} // 마우스를 버튼에서 뗐을 때
            />
            {/*<button*/}
            {/*    style={styles.btnImg}*/}
            {/*    onClick={imageButtonClicked} // onclick -> onClick*/}
            {/*/>*/}
            <h1 style={styles.title}>Book Buddy</h1>

            <div style={styles.search}>
                <input
                    type="text"
                    name="bookTitle"
                    style={styles.txtSearch}
                    placeholder="검색할 도서 제목"
                />
            </div>
        </div>
    );
}

export default Header; // 대문자로 시작하는 컴포넌트 이름
