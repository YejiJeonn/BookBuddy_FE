import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function MyPage() {
    const {user, setUser} = useContext(AuthContext);
    const [userName, setUserName] = useState('');       // 중괄호, 대괄호의 차이..??
    const [userEmail, setUserEmail] = useState('');
    const [userBirth, setUserBirth] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken'); // 토큰 가져오기

    useEffect(() => {

        fetchUser();
    }, [setUser, token]);

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

    const handleHistoryClick = () => {
        navigate(`/ReadHistory`);
    };

    return (
        <div style={{marginLeft: "10px", marginRight: "10px"}}>
            <h1>{user ? `${userName} 님 환영합니다.` : "사용자 정보를 불러오는 중입니다."}</h1>

            <hr style={{marginTop: "30px", marginBottom: "30px"}}/>

            <h3>활동명: {user}</h3>
            <h3>이메일: {userEmail}</h3>
            <h3>생 일: {userBirth}</h3>

            <hr style={{marginTop: "30px", marginBottom: "30px"}}/>

            <div onClick={handleHistoryClick}>
                <h3>나의 독서 기록</h3>
            </div>
        </div>
    );
}

export default MyPage;