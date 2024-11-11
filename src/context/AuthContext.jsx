import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";

// AuthContext 생성
export const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // 로그인된 유저 정보를 로컬 스토리지에서 가져오기
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // 실제로는 백엔드로부터 사용자 정보를 가져오는 로직이 필요
            axios.get('http://localhost:8080/users/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
