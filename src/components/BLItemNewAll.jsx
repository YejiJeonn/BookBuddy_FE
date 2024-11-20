import React from "react";
import '../styles/CssBookList.scss'
import PrevContents from "./PrevContents";

const BLItemNewAll = () => {

    const category = {id: "ItemNewAll", title: "신간 전체"};

    return <PrevContents category={category}/>
}

export default BLItemNewAll;
