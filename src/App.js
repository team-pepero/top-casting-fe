import "./App.css";
import Navibar from "./component/Navibar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import MainPage from "./page/MainPage";
import LoginContextProvider from "./contexts/LoginContextProvider";
import Cart from "./page/Cart";
import OrderSheet from "./page/OrderSheet";
import { CartProvider } from "./cart/CartContex";
import ProductListPage from "./page/ProductListPage";
import ItemDetailPage from "./page/ItemDetailPage";

function App() {
  return (
    <>
      <Router>
        <LoginContextProvider>
          <CartProvider>
            <Navibar></Navibar>
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/join" element={<SignUp />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/orderSheet" element={<OrderSheet />}></Route>
              {/* <Route path="/" element={<ProductListPage category="전체" />} /> */}
              {/* <Route
                path="/category/:categoryName"
                element={<ProductListPage />}
              /> */}
              <Route path="/items/:itemId" element={<ItemDetailPage />} />
            </Routes>
          </CartProvider>
        </LoginContextProvider>
      </Router>
    </>
  );
}

export default App;
