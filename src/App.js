import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Library from "./pages/Library";
import ReadHistory from "./pages/ReadHistory";
import BookDetail from "./components/BookDetail";
import {Route, Routes} from 'react-router-dom';
import React from "react";
import CategoryPage from "./pages/CategoryPage";
import Timer from "./pages/Timer";
import {TimerProvider} from "./pages/TimerContext";
import SearchPage from "./pages/SearchPage";


function App() {
    return (
        <div className="App">
            <TimerProvider>
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
                </Routes>
            </TimerProvider>
        </div>
    );
}

export default App;
