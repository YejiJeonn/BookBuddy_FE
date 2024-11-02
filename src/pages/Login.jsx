import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const styles = {
    loginBlock: {
        border: 'solid 1px black',
        borderRadius: '10px',
        paddingTop: '40px',
        paddingBottom: '40px',
        paddingLeft: '50px',
        paddingRight: '50px',
        width: 300,
        height: 180,
    },
    btnSignin: {
        width: '180px',
        height: '25px',
        color: 'white',
        backgroundColor: 'green',
        border: 'solid 1px black',
        borderRadius: '5px',
    },
    btnSignup: {
        width: '180px',
        height: '25px',
        border: 'solid 1px black',
        borderRadius: '5px',
    },
};

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

        const data = {
            userId: userId,
            password: password,
        };

        axios.post('http://localhost:8080/users/login', data)
            .then(response => {
                alert(response.data);
                navigate('/');
                // console.log('Data sent successfully:', response.data);
            })
            .catch(error => {
                alert("로그인 실패");
                console.error('Error sending data:', error);
            });
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div>
            <div align="center">
                <h3>로그인</h3>
                <form onSubmit={handleSubmit}>
                    <div style={styles.loginBlock}>
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
                                    <button type="submit" className="btnSignin" style={styles.btnSignin}> 로그인</button>
                                </td>
                            </tr>
                            <tr height="5px">
                                <td colSpan="2"></td>
                            </tr>
                            <tr align="center">
                                <td colSpan="2">
                                    <button type="button" className="btnSignup" style={styles.btnSignup}
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
