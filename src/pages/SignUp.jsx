import React, {useEffect, useState} from "react";
import axios, {get, post} from "axios";
import duplicateCheck from "../components/DuplicateCheck";
import main from "./Main";

const styles = {
    loginBlock: {
        border: 'solid 1px black',
        borderRadius: '10px',
        paddingTop: '40px',
        paddingBottom: '40px',
        paddingLeft: '50px',
        paddingRight: '50px',
        width: 300,
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
    const [checkPassword, setCPW] = useState('');
    const [nickName, setNickName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');

    const [status, setStatus] = useState(true);
    const [idDuplicate, setIdDuplicate] = useState(false);
    const [pwDuplicate, setPwDuplicate] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;

        // 필드 이름에 따라 상태를 업데이트
        if (name === "id") setUserId(value);
        if (name === "pw") setPassword(value);
        if (name === "c_pw") setCPW(value);
        if (name === "username") setNickName(value);
        if (name === "name") setName(value);
        if (name === "email") setEmail(value);
        if (name === "birthday") setBirth(value);
    };

    const handleDuplicate = () => {
        axios.get("http://localhost:8080/users/check-id"), {
            params: {}
        }
            .then(response => {
                setIdDuplicate(response.data);

                if(idDuplicate){
                    alert("중복된 아이디");
                } else{
                    alert("사용 가능");
                }
            }).catch(error => {
                alert("중복확인 요청 중 오류 발생");
        });
    };


    // 비밀번호 일치 여부 확인
    useEffect(() => {
        if (checkPassword === "") {
            setPwDuplicate(""); // 초기 상태
        } else if(password === checkPassword){
            setPwDuplicate("✅");
        } else {
            setPwDuplicate("불일치");
        }
    }, [password, checkPassword]);

    // 최종 회원가입 상태
    useEffect(() => {

    }, []);

    // 폼 제출 시 데이터 전송
    const handleSubmit = (event) => {

        if(!status){
            alert("기입한 정보를 다시 확인해주세요.");
            return;
        }

        event.preventDefault();  // 폼 제출 시 새로고침 방지
        const data = {
            id: userId,
            pw: password,
            c_pw: checkPassword,
            username: nickName,
            name: name,
            email: email,
            birth: birth,
        };

        axios.post('http://localhost:8080/api/submit', data)
            .then(response => {
                console.log('Data sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };


    // 회원가입 폼
    return (
        <div>
            <div align="center">
                <h3>회원가입</h3>
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
                                    <script src="DuplicateCheck.js"/>
                                </td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">PW &nbsp;</td>
                                <td>
                                    <input type="password" name="pw" value={password} onChange={handleChange} size="30"/>
                                </td>
                                <td></td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">PW 확인 &nbsp;</td>
                                <td>
                                    <input type="password" name="c_pw" value={checkPassword} onChange={handleChange}
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
                                    <input type="text" name="username" value={nickName} onChange={handleChange}
                                           size="30"/>
                                </td>
                                <td>
                                    <script src="DuplicateCheck.js"/>
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
                                    <input type="submit" value="회원가입" className="btnSignin"
                                           style={styles.btnSignup}/>
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