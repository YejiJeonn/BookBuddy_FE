import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/CssLogin.scss"

const styles = {
    loginBlock: {
        border: 'solid 1px black',
        borderRadius: '10px',
        paddingTop: '40px',
        paddingBottom: '40px',
        paddingLeft: '50px',
        paddingRight: '50px',
        width: '80%',
        height: '100%',
    },
    btnSignup: {
        width: '180px',
        height: '25px',
        color: 'white',
        backgroundColor: 'green',
        border: 'solid 1px black',
        borderRadius: '5px',
    },
};

function SignUp() {

    // spring boot로 Input 데이터 보내기
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');

    const [status, setStatus] = useState(true);
    const [pwDuplicate, setPwDuplicate] = useState('');

    // input에 값 입력 시 해당 변수 값 변경
    const handleChange = (event) => {
        const {name, value} = event.target;

        // 필드 이름에 따라 상태를 업데이트
        if (name === "id") setUserId(value);
        if (name === "pw") setPassword(value);
        if (name === "checkPassword") setCheckPassword(value);
        if (name === "nickname") setNickname(value);
        if (name === "name") setName(value);
        if (name === "email") setEmail(value);
        if (name === "birthday") setBirth(value);
    };

    // 아이디 중복값 검사
    const handleIdDuplicate = () => {
        axios.post("http://localhost:8080/users/check-id", null, {
            params: {userId} // 쿼리 파라미터로 userId 전달
        })
            .then(response => {
                // setIdDuplicate(response.data);

                if (response.data) {
                    alert("중복된 아이디");
                    setStatus(false);
                } else {
                    alert(userId + " 사용 가능");
                    setStatus(true);
                }
            })
            .catch(error => {
                console.error("중복확인 요청 중 오류 발생:", error);
                alert("중복확인 요청 중 오류 발생");
            });
    };

    // 비밀번호 일치 여부 확인
    useEffect(() => {
        if (checkPassword === "") {
            setPwDuplicate(""); // 초기 상태
        } else if (password === checkPassword) {
            setPwDuplicate("✅");
        } else {
            setPwDuplicate("불일치");
        }
    }, [password, checkPassword]);

    // 닉네임 일치 여부 확인
    const handleNicknameDuplicate = () => {
        axios.post("http://localhost:8080/users/check-nickname", null, {
            params: {nickname: nickname} // 쿼리 파라미터로 userId 전달
        })
            .then(response => {
                // setNickNameDuplicate(response.data);

                if (response.data) {
                    alert("중복된 닉네임");
                    setStatus(false);
                } else {
                    alert(nickname + " 사용 가능");
                    setStatus(true);
                }
            })
            .catch(error => {
                console.error("중복확인 요청 중 오류 발생:", error);
                alert("중복확인 요청 중 오류 발생");
            });
    };

    // 폼 제출 시 데이터 전송
    const handleSubmit = (event) => {

        if (!status) {
            alert("기입한 정보를 다시 확인해주세요.");
            return;
        }

        if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        event.preventDefault();  // 폼 제출 시 새로고침 방지
        const data = {
            userId: userId,
            password: password,
            nickname: nickname,
            name: name,
            email: email,
            birth: birth,
        };

        axios.post('http://localhost:8080/users/signup', data)
            .then(response => {
                alert("회원가입 성공");
                console.log('Data sent successfully:', response.data);
            })
            .catch(error => {
                alert("회원가입 실패");
                console.error('Error sending data:', error);
            });
    };


    // 회원가입 폼
    return (
        <div>
            <div align="center">
                <h1 className="loginTitle">회원가입</h1>
                <form onSubmit={handleSubmit}>
                    <div style={styles.loginBlock}>
                        <table>
                            <tbody>
                            <tr align="center">
                                <td align="center">ID &nbsp;</td>
                                <td>
                                    <input type="text" name="id" value={userId} onChange={handleChange} size="30"/>
                                </td>
                                <td>
                                    <button type="button" onClick={handleIdDuplicate} className="btnDuplicate">중복확인
                                    </button>
                                </td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">PW &nbsp;</td>
                                <td>
                                    <input type="password" name="pw" value={password} onChange={handleChange}
                                           size="30"/>
                                </td>
                                <td></td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">PW 확인 &nbsp;</td>
                                <td>
                                    <input type="password" name="checkPassword" value={checkPassword}
                                           onChange={handleChange}
                                           size="30"/>
                                </td>
                                <td>{pwDuplicate}</td>
                            </tr>

                            <tr>
                                <td colSpan="3"></td>
                            </tr>
                            <tr height="50px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">닉네임 &nbsp;</td>
                                <td>
                                    <input type="text" name="nickname" value={nickname} onChange={handleChange}
                                           size="30"/>
                                </td>
                                <td>
                                    <button type="button" onClick={handleNicknameDuplicate}
                                            className="btnDuplicate">중복확인
                                    </button>
                                </td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">이름 &nbsp;</td>
                                <td>
                                    <input type="text" name="name" value={name} onChange={handleChange} size="30"/>
                                </td>
                                <td></td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">이메일 &nbsp;</td>
                                <td>
                                    <input type="email" name="email" value={email} onChange={handleChange}
                                           size="30"/>
                                </td>
                                <td></td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">생일 &nbsp;</td>
                                <td>
                                    <input type="date" name="birthday" value={birth} onChange={handleChange}/>
                                </td>
                                <td></td>
                            </tr>

                            <tr>
                                <td colSpan="3"></td>
                            </tr>
                            <tr height="50px">
                                <td colSpan="3"></td>
                            </tr>
                            <tr align="center">
                                <td colSpan="3">
                                    <button type="submit" className="btnSignin" style={{paddingLeft: '60px'}}>
                                        회원가입
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

export default SignUp;