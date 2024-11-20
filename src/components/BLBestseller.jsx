import '../styles/CssBookList.scss'
import PrevContents from "./PrevContents";

const BLBestseller = () => {
    const category = {id: "bestseller", title: "베스트셀러"};

    return <PrevContents category={category}/>;
}

export default BLBestseller;
