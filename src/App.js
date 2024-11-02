import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Library from "./pages/Library";
import ReadHistory from "./pages/ReadHistory";
import Timer from "./pages/Timer";
import {Route, Routes} from 'react-router-dom';
import React from "react";


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<MyPage/>}/>
                <Route path="/library" element={<Library/>}/>
                <Route path="/reading-history" element={<ReadHistory/>}/>
                <Route path="/timer" element={<Timer/>}/>
            </Routes>
        </div>
    );
}

export default App;

// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
