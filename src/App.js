import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import {BrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";

function App() {
  return (
      // <RouterProvider router={root}></RouterProvider>
      <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
      </Routes>
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
