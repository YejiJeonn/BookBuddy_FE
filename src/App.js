import Main from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {Route, RouterProvider} from "react-router-dom";
import root from "./router/root";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import BookSearch from "./pages/BookSearch";


function App() {
  return (
      // <RouterProvider router={root}/>
      // <Routes>
      //     <Route path="/" element={<MainPage/>} />
      //     <Route path="/signup" element={<SignUp/>} />
      //     <Route path="/login" element={<Login/>} />
      // </Routes>

      <div>
          <Header/>
          {/*<SignUp/>*/}
          <Login/>
          {/*<BookSearch/>*/}
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
