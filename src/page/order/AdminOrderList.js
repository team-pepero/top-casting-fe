import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styled from "styled-components";

const AdminOrderList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getOrders();
    }, []);

    const dropdownFunction = (element) => {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        let list =
            element.parentElement.parentElement.getElementsByClassName(
                "dropdown-content"
            )[0];
        list.classList.add("target");
        for (i = 0; i < dropdowns.length; i++) {
            if (!dropdowns[i].classList.contains("target")) {
                dropdowns[i].classList.add("hidden");
            }
        }
        list.classList.toggle("hidden");
    };

    const getOrderItems = (order) => {
        const items = order.findOrderItemDtos;
        if (items.length == 1) {
            return items[0].itemName;
        } else {
            return items[0].itemName + "외 (" + (items.length - 1) + ")개";
        }
    };

    const getOrders = async () => {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            navigate("/login");
            return;
        }
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_URL}/api/v1/admin/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response); // '/orders'는 백엔드 엔드포인트에 맞게 수정하세요.
            setOrders(response.data);
        } catch (error) {
            console.error("주문 정보를 가져오는 데 실패했습니다:", error);
        }
    };

    const getRefundOrders = async () => {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            navigate("/login");
            return;
        }
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_URL}/api/v1/orders/refund`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response); // '/orders'는 백엔드 엔드포인트에 맞게 수정하세요.
            setOrders(response.data);
        } catch (error) {
            console.error("주문 정보를 가져오는 데 실패했습니다:", error);
        }
    };

    const handleOrderClick = (uuid) => {
        navigate(`/requestRefundList/${uuid}`);
    };
    const Checkbox = styled.input.attrs({ type: "checkbox" })``;
    const CheckIcon = styled.div`
        display: none;

        ${Checkbox}:checked + & {
            display: flex;
        }
    `;

    return (
        <div class="sm:px-6 w-full">
            <div class="px-4 md:px-10 py-4 md:py-7">
                <div class="flex items-center justify-between">
                    <p
                        tabindex="0"
                        class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
                    >
                        주문 목록
                    </p>
                    <div class="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select
                            aria-label="select"
                            class="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                        >
                            <option class="text-sm text-indigo-800">
                                Latest
                            </option>
                            <option class="text-sm text-indigo-800">
                                Oldest
                            </option>
                            <option class="text-sm text-indigo-800">
                                Latest
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div class="sm:flex items-center justify-between">
                    <div class="flex items-center">
                        <a
                            class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                            href=" javascript:void(0)"
                            onClick={getOrders}
                        >
                            <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                <p>All</p>
                            </div>
                        </a>
                        <a
                            class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                            href="javascript:void(0)"
                            onClick={getRefundOrders}
                        >
                            <div class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                <p>RefundRequest</p>
                            </div>
                        </a>
                        <a
                            class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                            href="javascript:void(0)"
                        >
                            <div class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                <p>Re</p>
                            </div>
                        </a>
                    </div>
                    <button
                        onclick="popuphandler(true)"
                        class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                    >
                        <p class="text-sm font-medium leading-none text-white">
                            Add Task
                        </p>
                    </button>
                </div>
                <div class="mt-7 overflow-x-auto">
                    <div>
                        <table class="w-full whitespace-nowrap">
                            {orders.map((order) => (
                                <tbody>
                                    <tr
                                        tabindex="0"
                                        class="focus:outline-none h-16 border border-gray-100 rounded"
                                    >
                                        <td>
                                            <div class="ml-5">
                                                <div class="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                                    <input
                                                        placeholder="checkbox"
                                                        type="checkbox"
                                                        class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
                                                    />
                                                    <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                                        <svg
                                                            class="icon icon-tabler icon-tabler-check"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            stroke-width="1.5"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        >
                                                            <path
                                                                stroke="none"
                                                                d="M0 0h24v24H0z"
                                                            ></path>
                                                            <path d="M5 12l5 5l10 -10"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td class="">
                                            <div class="flex items-center pl-5">
                                                <p class="text-base font-medium leading-none text-gray-700 mr-2">
                                                    {getOrderItems(order)}
                                                </p>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                                                        stroke="#3B82F6"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                    <path
                                                        d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                                                        stroke="#3B82F6"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </td>
                                        <td class="pl-24"></td>
                                        <td class="pl-5">
                                            <div class="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                                                        stroke="#52525B"
                                                        stroke-width="1.25"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                    <circle
                                                        cx="7.50004"
                                                        cy="7.49967"
                                                        r="1.66667"
                                                        stroke="#52525B"
                                                        stroke-width="1.25"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></circle>
                                                </svg>
                                                <p class="text-sm leading-none text-gray-600 ml-2">
                                                    {order.orderStatus}
                                                </p>
                                            </div>
                                        </td>
                                        <td class="pl-5">
                                            <div class="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M7.5 5H16.6667"
                                                        stroke="#52525B"
                                                        stroke-width="1.25"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                    <path
                                                        d="M7.5 10H16.6667"
                                                        stroke="#52525B"
                                                        stroke-width="1.25"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                    <path
                                                        d="M7.5 15H16.6667"
                                                        stroke="#52525B"
                                                        stroke-width="1.25"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                    <path
                                                        d="M4.16669 5V5.00667"
                                                        stroke="#52525B"
                                                        stroke-width="1.25"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                    <path
                                                        d="M4.16669 10V10.0067"
                                                        stroke="#52525B"
                                                        stroke-width="1.25"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                    <path
                                                        d="M4.16669 15V15.0067"
                                                        stroke="#52525B"
                                                        stroke-width="1.25"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                </svg>
                                                <p class="text-sm leading-none text-gray-600 ml-2">
                                                    {order.orderCreatedDate}
                                                </p>
                                            </div>
                                        </td>
                                        <td class="pl-5">
                                            <div class="flex items-center">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                >
                                                    <path d="M4.82 19.407c-2.966-1.857-4.94-5.153-4.94-8.907 0-5.795 4.705-10.5 10.5-10.5 3.605 0 6.789 1.821 8.68 4.593 2.966 1.857 4.94 5.153 4.94 8.907 0 5.795-4.705 10.5-10.5 10.5-3.599 0-6.778-1.815-8.67-4.579l-.01-.014zm8.68-15.407c5.243 0 9.5 4.257 9.5 9.5s-4.257 9.5-9.5 9.5-9.5-4.257-9.5-9.5 4.257-9.5 9.5-9.5zm.5 15h-1.021v-.871c-2.343-.302-2.599-2.179-2.599-2.744h1.091c.025.405.157 1.774 2.182 1.774.599 0 1.088-.141 1.453-.419.361-.276.536-.612.536-1.029 0-.793-.513-1.367-2.07-1.718-2.368-.536-2.923-1.398-2.923-2.533 0-1.509 1.223-2.216 2.33-2.406v-1.054h1.021v1.015c2.491.195 2.695 2.215 2.695 2.771h-1.098c0-1.161-.918-1.766-1.996-1.766-1.077 0-1.854.532-1.854 1.408 0 .781.439 1.165 1.994 1.554 1.879.473 2.999 1.101 2.999 2.681 0 1.744-1.509 2.393-2.74 2.493v.844zm2.85-15.453c-1.696-1.58-3.971-2.547-6.47-2.547-5.243 0-9.5 4.257-9.5 9.5 0 2.633 1.073 5.017 2.806 6.739l-.004-.01c-.44-1.159-.682-2.416-.682-3.729 0-5.795 4.705-10.5 10.5-10.5 1.171 0 2.298.192 3.35.547z" />
                                                </svg>
                                                <p class="text-sm leading-none text-gray-600 ml-2">
                                                    {order.totalItemPrice}
                                                </p>
                                            </div>
                                        </td>
                                        <td class="pl-5">
                                            <div class="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M12.5 5.83339L7.08333 11.2501C6.75181 11.5816 6.56556 12.0312 6.56556 12.5001C6.56556 12.9689 6.75181 13.4185 7.08333 13.7501C7.41485 14.0816 7.86449 14.2678 8.33333 14.2678C8.80217 14.2678 9.25181 14.0816 9.58333 13.7501L15 8.33339C15.663 7.67034 16.0355 6.77107 16.0355 5.83339C16.0355 4.8957 15.663 3.99643 15 3.33339C14.337 2.67034 13.4377 2.29785 12.5 2.29785C11.5623 2.29785 10.663 2.67034 10 3.33339L4.58333 8.75005C3.58877 9.74461 3.03003 11.0935 3.03003 12.5001C3.03003 13.9066 3.58877 15.2555 4.58333 16.2501C5.57789 17.2446 6.92681 17.8034 8.33333 17.8034C9.73985 17.8034 11.0888 17.2446 12.0833 16.2501L17.5 10.8334"
                                                        stroke="#52525B"
                                                        stroke-width="1.25"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></path>
                                                </svg>
                                                <p class="text-sm leading-none text-gray-600 ml-2">
                                                    {order.orderCreatedDate}
                                                </p>
                                            </div>
                                        </td>
                                        <td class="pl-4">
                                            <button
                                                class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                                                onClick={() =>
                                                    handleOrderClick(
                                                        order.orderId
                                                    )
                                                }
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td>
                                            <div class="relative px-5 pt-2">
                                                <button
                                                    class="focus:ring-2 rounded-md focus:outline-none"
                                                    onclick={() =>
                                                        dropdownFunction(this)
                                                    }
                                                    role="button"
                                                    aria-label="option"
                                                >
                                                    <svg
                                                        class="dropbtn"
                                                        onclick={() =>
                                                            dropdownFunction(
                                                                this
                                                            )
                                                        }
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                                                            stroke="#9CA3AF"
                                                            stroke-width="1.25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                                                            stroke="#9CA3AF"
                                                            stroke-width="1.25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                                                            stroke="#9CA3AF"
                                                            stroke-width="1.25"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                    </svg>
                                                </button>
                                                <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                                                    <div
                                                        tabindex="0"
                                                        class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                                                    >
                                                        <p>Edit</p>
                                                    </div>
                                                    <div
                                                        tabindex="0"
                                                        class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                                                    >
                                                        <p>Delete</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderList;
