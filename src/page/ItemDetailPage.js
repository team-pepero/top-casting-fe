import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HttpGet } from "../service/HttpService";
import { HttpPost } from "../service/HttpService";

const ItemDetailPage = () => {
    const { itemId } = useParams(); // URL에서 itemId 추출
    const [itemDetail, setItemDetail] = useState(null);
    const [quantity, setQuantity] = useState(1); // 수량 상태 관리
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
        const fetchItemDetail = async () => {
            try {
                // 여기서 `itemId`를 사용해 API 호출
                const data = await HttpGet(
                    `/api/v1/items/${itemId}`
                );
                setItemDetail(data);
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };

        fetchItemDetail();
    }, [itemId]); // 의존성 배열에서도 `itemId` 사용

    const handleAddToCart = async () => {
        const itemToAdd = {
            optionId: selectedColor, // ID of the selected color option
            itemQuantity: quantity, // Quantity of the item to add
        };

        try {
            const response = await HttpPost(
                "/api/v1/carts",
                itemToAdd
            );

            console.log("Response from adding item to cart:", response);
        } catch (error) {
            console.error("Failed to add item to cart:", error);
        }
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
        console.log(`handleColorChange : ${event.target.value}`);
    };

    const handleQuantityChange = (event) => {
        setQuantity(Math.max(1, event.target.value)); // 수량은 최소 1 이상
    };

    if (!itemDetail) return <div>Loading...</div>;

    return (

        <>
            <div class="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
                <div id="viewerButton" class="hidden w-full flex justify-center">
                    <button onclick="openView()" class="bg-white text-indigo-600 shadow-md rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 py-5 px-10 font-semibold">Open Quick View</button>
                </div>
                <div id="viewerBox" class="lg:p-10 md:p-6 p-4 bg-white dark:bg-gray-900">
                    <div class="mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-strech justify-center lg:space-x-8">
                        <div class="lg:w-1/2 flex justify-between items-strech bg-white-50  px-2 py-20 md:py-6 md:px-6 lg:py-24">
                            <div>
                                <img src={itemDetail.itemImageUrl} alt={itemDetail.itemName} class="w-full h-full" />
                            </div>
                        </div>
                        <div class="lg:w-1/2 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0">
                            <h1 class="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">{itemDetail.itemName}</h1>
                            <div class="flex flex-col justify-start items-start w-full space-y-4">
                                <p class="text-xl md:text-2xl leading-normal text-gray-800 dark:text-gray-50"></p>
                                <p class="text-l md:text-xl font-semibold leading-none text-gray-600 dark:text-white">₩ {itemDetail.itemPrice} </p>
                            </div>
                            <p class="text-base leading-normal text-gray-600 dark:text-white mt-2">You don't just want to be comfortable sitting in a bar stool—you want to be comfortable shimmying it up to the bar, closer to your lover, or back slightly to include a third person in the conversation.</p>

                            <div class="mt-8 flex-col">
                                <div>
                                    <select id="color-select" value={selectedColor} onChange={handleColorChange} class="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600">
                                        <option disabled selected>Color</option>
                                        {itemDetail.itemColors.map((color) => (
                                            <option key={color.optionId} value={color.optionId}>
                                                {color.colorName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <input
                                    class="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>

                            <div class="flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-12">
                                <button onClick={handleAddToCart} class="w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none text-white uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">Add to Cart</button>
                            </div>
                        </div>
                    </div >
                </div >
                <div class="mx-auto p-16 bg-gray-100 dark:bg-gray-800 flex flex-col w-3/4">
                    <img src={itemDetail.itemDetailedImageUrl} alt="Detailed view" class="mx-auto w-full h-full" />
                </div>
            </div >


        </>

    );
};

export default ItemDetailPage;
