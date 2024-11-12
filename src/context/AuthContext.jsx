import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";

// AuthContext 생성
export const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // 로그인된 유저 정보를 로컬 스토리지에서 가져오기
    useEffect(() => {
        const savedUser = localStorage.getItem('nickName');
        if (savedUser) {
            setUser(savedUser);
        }

        // const token = localStorage.getItem('accessToken');
        // if (token) {
        //     // 실제로는 백엔드로부터 사용자 정보를 가져오는 로직이 필요
        //     axios.get('http://localhost:8080/users/info', {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     })
        //         .then(response => {
        //             setUser(response.data.nickName);
        //             console.log("token: " + token + "\nnickName: " + response.data.nickName);
        //         })
        //         .catch(error => {
        //             console.error('Error fetching user info:', error);
        //             console.log("token: " + token);
        //         });
        // }
    }, []);

    const login = async (id, password) => {
        try {
            // 로그인 API 호출
            const response = await axios.post("http://localhost:8080/users/login", {id, password});
            const {nickName, accessToken} = response.data;

            // nickName과 accessToken을 localStorage에 저장
            localStorage.setItem("nickName", nickName);
            localStorage.setItem("accessToken", accessToken);

            // user 상태를 nickName으로 설정
            setUser(nickName);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("nickName");
        localStorage.removeItem("accessToken"); // 로그아웃 시 accessToken 제거
    };

    return (
        <AuthContext.Provider value={{user, setUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
