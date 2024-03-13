import "./App.css";
import Navibar from "./component/Navibar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import MainPage from "./page/MainPage";
import LoginContextProvider from "./contexts/LoginContextProvider";
import Cart from "./page/Cart";
import OrderSheet from "./page/OrderSheet";

function App() {
  return (
    <>
      <Router>
        <LoginContextProvider>
          <Navibar></Navibar>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/join" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/orderSheet" element={<OrderSheet />}></Route>
          </Routes>
        </LoginContextProvider>
      </Router>
    </>
  );
}

export default App;
