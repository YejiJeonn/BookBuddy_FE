import React from "react";

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
    return (
        <div>
            <div align="center">
                <h3>로그인</h3>
                <form>
                    <div style={styles.loginBlock}>
                        <table>
                            <tbody>
                            <tr align="center">
                                <td align="center">ID &nbsp;</td>
                                <td>
                                    <input type="text" name="id" size="30" />
                                </td>
                            </tr>
                            <tr height="5px">
                                <td colSpan="2"></td>
                            </tr>
                            <tr align="center">
                                <td align="center">PW &nbsp;</td>
                                <td>
                                    <input type="password" name="pw" size="30" />
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
                                    <input type="submit" value="로그인" className="btnSignin" style={styles.btnSignin} />
                                </td>
                            </tr>
                            <tr height="5px">
                                <td colSpan="2"></td>
                            </tr>
                            <tr align="center">
                                <td colSpan="2">
                                    <input type="button" value="회원가입" className="btnSignup" style={styles.btnSignup} />
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
