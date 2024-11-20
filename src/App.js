import React from "react";
import {Route, Routes} from 'react-router-dom';
import axios from "axios";

import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Library from "./pages/Library";
import ReadHistory from "./pages/ReadHistory";
import BookDetail from "./components/BookDetail";
import CategoryPage from "./pages/CategoryPage";
import Timer from "./pages/Timer";
import SearchPage from "./pages/SearchPage";
import Header from "./components/Header";
import {AuthProvider} from "./context/AuthContext";
import {TimerProvider} from "./pages/TimerContext";
import PostListPage from "./pages/PostListPage";
import WritePostPage from "./pages/WritePostPage";


function App() {
    // 로그인 후 저장된 토큰 가져오기
    const token = localStorage.getItem('accessToken');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return (
        <div className="App">
            <AuthProvider>  {/* 왜 AuthContext는 안되고 AuthProvider는 에러가 안날까? */}
                <TimerProvider>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/profile" element={<MyPage/>}/>
                        <Route path="/library" element={<Library/>}/>
                        <Route path="/reading-history" element={<ReadHistory/>}/>
                        <Route path="/timer" element={<Timer/>}/>

                        <Route path="/book/:id" element={<BookDetail/>}/>
                        <Route path="/category/:categoryId" element={<CategoryPage/>}/>
                        <Route path="/searchpage" element={<SearchPage/>}/>
                        <Route path="/book-detail/:bookIsbn" element={<BookDetail/>}/>

                        <Route path="/posts/:bookIsbn" element={<PostListPage/>}/>
                        <Route path="/book/:bookIsbn/posts/write" element={<WritePostPage/>}/>
                        <Route path="/book/:bookIsbn/posts/edit/:postId" element={<WritePostPage/>}/>
                    </Routes>
                </TimerProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
