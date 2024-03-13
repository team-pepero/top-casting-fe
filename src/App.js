import "./App.css";
import Navibar from "./component/Navibar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import MainPage from "./page/MainPage";
import ItemPage from "./page/ItemPage";
import { CartProvider } from "./cart/CartContex";
import CartPage from "./page/CartPage";
import "./App.css";
import LoginContextProvider from "./contexts/LoginContextProvider";

function App() {
  return (
    <>
      <LoginContextProvider>
        <CartProvider>
          <Router>
            <Navibar></Navibar>
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/join" element={<SignUp />}></Route>
              <Route path="/login" element={<Login />}></Route>

              <Route path="/item/:itemId" element={<ItemPage />}></Route>

              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </LoginContextProvider>
    </>
  );
}

export default App;
