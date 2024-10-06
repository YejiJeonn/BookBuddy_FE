import React from "react";
import Header from "./Header";
import {post} from "axios";

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

function SignUp(porps) {
    return (
        <div>
            <Header/>
            <div align="center">
                <h3>회원가입</h3>
                <form>
                    <div style={styles.loginBlock}>
                        <table>
                            <tbody>
                            <tr align="center">
                                <td align="center">ID &nbsp;</td>
                                <td>
                                    <input type="text" name="id" size="30"/>
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
                                    <input type="password" name="pw" size="30"/>
                                </td>
                                <td>✅</td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">PW 확인 &nbsp;</td>
                                <td>
                                    <input type="password" name="c_pw" size="30"/>
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
                                    <input type="text" name="username" size="30"/>
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
                                    <input type="text" name="name" size="30"/>
                                </td>
                                <td></td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">이메일 &nbsp;</td>
                                <td>
                                    <input type="email" name="email" size="30"/>
                                </td>
                                <td></td>
                            </tr>

                            <tr height="5px">
                                <td colSpan="3"></td>
                            </tr>

                            <tr align="center">
                                <td align="center">생일 &nbsp;</td>
                                <td>
                                    <input type="date" name="birthday"/>
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
                                    <input type="submit" value="회원가입" className="btnSignin" style={styles.btnSignup}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;