import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ReadHistory from "./ReadHistory";

function MyPage() {
    const {user, setUser} = useContext(AuthContext);
    const nickname = localStorage.getItem('nickname');
    console.log(nickname);
    const [userName, setUserName] = useState('');       // 중괄호, 대괄호의 차이..??
    const [userEmail, setUserEmail] = useState('');
    const [userBirth, setUserBirth] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken'); // 토큰 가져오기

    useEffect(() => {
        if (!token) {
            navigate("/login");  // 토큰이 없으면 로그인 페이지로 이동
        } else {
            fetchUser();
        }
    }, [token]);


    // 유저 정보를 가져오기 위해 서버에 요청
    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 응답에서 사용자 정보 설정
            setUserName(response.data.name);
            setUserEmail(response.data.email);
            // 날짜만 추출하여 yyyy-mm-dd 형식으로 변환
            const birthDate = new Date(response.data.birth);
            const formattedBirth = birthDate.toISOString().split('T')[0];
            setUserBirth(formattedBirth);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const handleLogout = () => {
        // 로그아웃 시 로컬 스토리지에서 토큰 제거 및 사용자 정보 초기화
        localStorage.removeItem('accessToken');
        localStorage.removeItem('nickname');
        localStorage.removeItem('userId');
        setUser(null);
        navigate("/");
    };

    const handleHistoryClick = () => {
        navigate(`/reading-history`);
    };

    return (
        <div style={{marginLeft: "10px", marginRight: "10px"}}>
            <h1>{user ? `${userName} 님 환영합니다.` : "사용자 정보를 불러오는 중입니다."}</h1>

            <button onClick={handleLogout}>로그아웃</button>

            <hr style={{marginTop: "30px", marginBottom: "30px"}}/>

            <h3>활동명: {nickname}</h3>
            <h3>이메일: {userEmail}</h3>
            <h3>생 일: {userBirth}</h3>

            <hr style={{marginTop: "30px", marginBottom: "30px"}}/>

            <div onClick={handleHistoryClick}>
                <br/><br/><br/><br/>
                <ReadHistory/>
            </div>
        </div>
    );
}

export default MyPage;