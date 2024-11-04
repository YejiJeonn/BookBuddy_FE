import React from "react";
import BLItemNewAll from "../components/BLItemNewAll";
import BLItemNewSpecial from "../components/BLItemNewSpecial";
import BLBestseller from "../components/BLBestseller";

function BookList() {
    return (
        <div>
            <BLItemNewAll/>

            <BLItemNewSpecial/>

            <BLBestseller/>
        </div>
    );
}

export default BookList;
