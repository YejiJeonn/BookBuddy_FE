import React, {useState} from "react";
import axios, {get, post} from "axios";
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
    const [id, setID] = useState('');
    const [pw, setPW] = useState('');
    const [c_pw, setCPW] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;

        // 필드 이름에 따라 상태를 업데이트
        if (name === "id") setID(value);
        if (name === "pw") setPW(value);
        if (name === "c_pw") setCPW(value);
        if (name === "username") setUsername(value);
        if (name === "name") setName(value);
        if (name === "email") setEmail(value);
        if (name === "birthday") setBirth(value);
    };

    // 폼 제출 시 데이터 전송
    const handleSubmit = (event) => {
        event.preventDefault();  // 폼 제출 시 새로고침 방지
        const data = {
            id: id,
            pw: pw,
            c_pw: c_pw,
            username: username,
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
                                    <input type="text" name="id" value={id} onChange={handleChange} size="30"/>
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
                                    <input type="password" name="pw" value={pw} onChange={handleChange} size="30"/>
                                </td>
                                <td>✅</td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">PW 확인 &nbsp;</td>
                                <td>
                                    <input type="password" name="c_pw" value={c_pw} onChange={handleChange}
                                           size="30"/>
                                </td>
                                <td>✅</td>
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
                                    <input type="text" name="username" value={username} onChange={handleChange}
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