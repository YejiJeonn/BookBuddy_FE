import React from "react";
import BLItemNewAll from "../components/BLItemNewAll";
import BLItemNewSpecial from "../components/BLItemNewSpecial";
import BLBestseller from "../components/BLBestseller";

function BookList() {
    return (
        <div>
            <BLBestseller/>

            <BLItemNewSpecial/>

            <BLItemNewAll/>

        </div>
    );
}

export default BookList;
