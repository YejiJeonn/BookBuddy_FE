import React from "react";
import {Link} from "react-router-dom";
import BasicLayout from "../layout/basicLayout";

const MainPage = () => {
    return(
        // <BasicLayout>
            <div>
                <h1> 메인 페이지 </h1>
                <Link to="/signup">Sign Up</Link>
            </div>
        // </BasicLayout>
    )
}

export default MainPage;
