import ReactDOM from "react-dom/client";
import React from "react";

function DuplicateCheck(props) {
    const [isClicked, setIsClicked] = React.useState(false);

    return React.createElement(
        'button',
        {onClick: () => setIsClicked(true)},
        isClicked ? '사용 가능' : '중복 확인'
    )
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(DuplicateCheck), domContainer);