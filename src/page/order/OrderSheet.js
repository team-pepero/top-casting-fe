import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const OrderSheet = () => {
    const location = useLocation();
    const orderData = location.state.orderData;
    const [orderDetails, setOrderDetails] = useState({
        customerName: "",
        customerAddress: "",
        customerPhoneNumber: "",
        orderItems: orderData.content || [],
        totalItemQuantity: orderData.content.length,
        totalItemPrice: orderData.totalPrice,
        shippingFee: orderData.shippingFee || 0,
        addOrderItemDtos: orderData.content,
    });

    const navigate = useNavigate();

    useEffect(() => {
        console.log(orderData);
        // const totalQuantity = orderDetails.addOrderItemDtos.reduce((total, item) => total + Number(item.itemQuantity), 0);
        // const totalPrice = orderDetails.addOrderItemDtos.reduce((total, item) => total + (Number(item.itemQuantity) * Number(item.itemPrice)), 0);

        // setOrderDetails(prevDetails => ({
        //     ...prevDetails,
        //     totalItemQuantity: totalQuantity,
        //     totalItemPrice: totalPrice
        // }));
    }, [orderDetails.addOrderItemDtos]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            navigate("/login");
            return;
        }
        try {
            orderDetails.totalItemPrice += orderDetails.shippingFee;
            const response = await axios.post(
                `${process.env.REACT_APP_BACK_URL}/api/v1/orders`,
                orderDetails,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log("Order added successfully:", response.data);
            const orderId = response.data.orderId;
            navigate(`/payment?orderId=${orderId}`, {
                state: { orderDetails },
            });
        } catch (error) {
            console.error("Failed to add order:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                    <div class="flex justify-start item-start space-y-2 flex-col">
                        <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                            주문하기
                        </h1>
                    </div>
                    <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                                    주문목록
                                </p>
                                {orderData.content.map((item) => (
                                    <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                        <div class="pb-4 md:pb-8 w-full md:w-40">
                                            <img
                                                class="w-full hidden md:block"
                                                src={item.itemImage}
                                                alt={item.itemName}
                                            />
                                            <img
                                                class="w-full md:hidden"
                                                src={item.itemImage}
                                                alt={item.itemName}
                                            />
                                        </div>
                                        <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                            <div class="w-full flex flex-col justify-start items-start space-y-8">
                                                <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                                    {item.itemName}
                                                </h3>
                                                <div class="flex justify-start items-start flex-col space-y-2">
                                                    {/* <p class="text-sm dark:text-white leading-none text-gray-800">
                                                    <span class="dark:text-gray-400 text-gray-300">
                                                        Style:{" "}
                                                    </span>{" "}
                                                    Italic Minimal Design
                                                </p>
                                                <p class="text-sm dark:text-white leading-none text-gray-800">
                                                    <span class="dark:text-gray-400 text-gray-300">
                                                        Size:{" "}
                                                    </span>{" "}
                                                    Small
                                                </p> */}
                                                    <p class="text-sm dark:text-white leading-none text-gray-800">
                                                        <span class="dark:text-gray-400 text-gray-300">
                                                            Color:{" "}
                                                        </span>{" "}
                                                        {item.itemColor}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="flex justify-between space-x-8 items-start w-full">
                                                <p class="text-base dark:text-white xl:text-lg leading-6">
                                                    {item.itemPrice}원
                                                </p>
                                                <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                                    {item.itemQuantity}개
                                                </p>
                                                <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                                    {item.itemPrice *
                                                        item.itemQuantity}
                                                    원
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                    <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                        Summary
                                    </h3>
                                    <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                        <div class="flex justify-between w-full">
                                            <p class="text-base dark:text-white leading-4 text-gray-800">
                                                소계
                                            </p>
                                            <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                                {orderDetails.totalItemPrice}
                                            </p>
                                        </div>
                                        <div class="flex justify-between items-center w-full">
                                            <p class="text-base dark:text-white leading-4 text-gray-800">
                                                할인{" "}
                                                <span class="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                                                    쿠폰
                                                </span>
                                            </p>
                                            <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                                0
                                            </p>
                                        </div>
                                        <div class="flex justify-between items-center w-full">
                                            <p class="text-base dark:text-white leading-4 text-gray-800">
                                                배송비
                                            </p>
                                            <p class="text-base dark:text-gray-300 leading-4 text-gray-600">
                                                {orderDetails.shippingFee}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
                                            합계
                                        </p>
                                        <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                                            {orderDetails.totalItemPrice + orderDetails.shippingFee}
                                        </p>
                                    </div>
                                    <div class="w-full flex justify-center items-center">
                                        <button class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                                            주문하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                            <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                                주문자 정보 입력
                            </h3>
                            <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                <div class="flex flex-col justify-start items-start flex-shrink-0">
                                    <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                        <div class="flex justify-start items-start flex-col space-y-2">
                                            <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                                                주문자 이름
                                            </p>
                                            <input
                                                name="customerName"
                                                value={
                                                    orderDetails.customerName
                                                }
                                                onChange={handleInputChange}
                                                placeholder="주문자 이름 입력"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                    <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                        <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                            <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                                주문자 주소
                                            </p>
                                            <input
                                                name="customerAddress"
                                                value={
                                                    orderDetails.customerAddress
                                                }
                                                onChange={handleInputChange}
                                                placeholder="주문자 주소 입력"
                                                required
                                            />
                                        </div>
                                        <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                            <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                                                주문자 전화번호
                                            </p>
                                            <input
                                                name="customerPhoneNumber"
                                                value={
                                                    orderDetails.customerPhoneNumber
                                                }
                                                onChange={handleInputChange}
                                                placeholder="주문자 전화번호 입력"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default OrderSheet;
