import React from "react";
import '../styles/CssBookList.scss'
import PrevContents from "./PrevContents";

const BLItemNewSpecial = () => {
    
    const category = {id: "ItemNewSpecial", title: "주목할 만한 신간"};

    return <PrevContents category={category}/>
}

export default BLItemNewSpecial;
