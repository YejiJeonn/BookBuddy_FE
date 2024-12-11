import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/CssLogin.scss"

function Login() {

    // param 선언
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;

        // 필드 이름에 따라 상태를 업데이트
        if (name === "id") setUserId(value);
        if (name === "pw") setPassword(value);
    };

    // 입력 정보 비교 후 로그인 여부 출력
    const handleSubmit = async (event) => {
        event.preventDefault();  // 폼 제출 시 새로고침 방지

        localStorage.setItem('userId', userId);

        const data = {
            userId: userId,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:8080/users/login', data);
            const token = response.data.token;    // 서버로부터 받은 토큰
            const nickname = response.data.nickname;     // 사용자 정보 저장

            // 토큰을 로컬 스토리지에 저장하여 인증 상태 유지
            localStorage.setItem('accessToken', token);
            localStorage.setItem('nickname', nickname);

            alert("로그인 성공");
            navigate('/');  // 로그인 후 홈 화면으로 이동
        } catch (error) {
            alert("로그인 실패");
            console.error('Error sending data: ', error);
        }

    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div>
            <div align="center">
                <h1 className="loginTitle">로그인</h1>
                <form onSubmit={handleSubmit}>
                    <div className="loginBlock">
                        <table>
                            <tbody>
                            <tr align="center">
                                <td align="center">ID &nbsp;</td>
                                <td>
                                    <input type="text" name="id" size="30" onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr height="5px">
                                <td colSpan="2"></td>
                            </tr>
                            <tr align="center">
                                <td align="center">PW &nbsp;</td>
                                <td>
                                    <input type="password" name="pw" size="30" onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"></td>
                            </tr>
                            <tr height="50px">
                                <td colSpan="2"></td>
                            </tr>
                            <tr align="center">
                                <td colSpan="2">
                                    <button type="submit" className="btnSignin"> 로그인</button>
                                </td>
                            </tr>
                            <tr height="5px">
                                <td colSpan="2"></td>
                            </tr>
                            <tr align="center">
                                <td colSpan="2">
                                    <button type="button" className="btnSignup"
                                            onClick={handleSignUp}> 회원가입
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login; // Login 컴포넌트 export
