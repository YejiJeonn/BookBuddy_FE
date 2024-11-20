import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";

// AuthContext 생성
export const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // 로그인된 유저 정보를 로컬 스토리지에서 가져오기
    useEffect(() => {
        const savedUser = localStorage.getItem('nickname');
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const login = async (id, password) => {
        try {
            // 로그인 API 호출
            const response = await axios.post("http://localhost:8080/users/login", {id, password});
            const {nickname, accessToken} = response.data;

            // nickName과 accessToken을 localStorage에 저장
            localStorage.setItem("nickname", nickname);
            localStorage.setItem("accessToken", accessToken);

            // user 상태를 nickname으로 설정
            setUser(nickname);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('nickname');
        localStorage.removeItem('userId');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, setUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
