import "./App.css";
import Navibar from "./component/Navibar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./page/auth/SignUp";
import Login from "./page/auth/Login";
import MainPage from "./page/MainPage";
import LoginContextProvider from "./contexts/LoginContextProvider";
import Cart from "./page/Cart";
import OrderSheet from "./page/order/OrderSheet";
import Orders from "./page/order/Orders";
import OrderDetail from "./page/order/OrderDetail";
import Payment from "./page/order/Payment";
import OrderCompletePage from "./page/order/OrderComletePage";
import RequestRefundList from "./page/order/RequestRefundList";
import OrderDetailAdmin from "./page/order/OrderDetailAdmin";
import AdminOrderList from "./page/order/AdminOrderList";
import AddInfoPage from "./page/auth/AddInfoPage";
import ItemDetailPage from "./page/ItemDetailPage";
import EditProfile from "./page/EditProfile";
import MyPage from "./page/MyPage";

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
                        <Route path="/items/:itemId" element={<ItemDetailPage />} />
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="/orders" element={<Orders />}></Route>{" "}
                        {/* 주문 리스트 */}
                        <Route path="/orderSheet" element={<OrderSheet />}></Route>{" "}
                        {/* 주문작성 */}
                        <Route
                            path="/order/:orderId"
                            element={<OrderDetail />}
                        ></Route>{" "}
                        {/* 주문 상세 */}
                        <Route path="/payment" element={<Payment />}></Route> {/*결제*/}
                        <Route
                            path="/orderComplete"
                            element={<OrderCompletePage />}
                        ></Route>{" "}
                        {/* 결제완료창 */}
                        <Route
                            path="/admin/orders"
                            element={<AdminOrderList />}
                        ></Route>{" "}
                        {/* 관리자 모든 주문 조회 */}
                        <Route
                            path="/RequestRefundList"
                            element={<RequestRefundList />}
                        ></Route>{" "}
                        {/*환불 요청 리스트*/}
                        <Route
                            path="/requestRefundList/:orderId"
                            element={<OrderDetailAdmin />}
                        ></Route>{" "}
                        {/*환불요청 수락*/}
                        <Route
                            path="/socialLogin/additionalInfo"
                            element={<AddInfoPage />}
                        ></Route>
                        <Route path='/EditProfile' element={<EditProfile />}></Route> {/*회원정보 수정*/}
                        <Route path='/MyPage' element={<MyPage />}></Route>
                    </Routes>
                </LoginContextProvider>
            </Router>
        </>
    );
}

export default App;
