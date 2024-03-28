import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../contexts/LoginContextProvider";
import Cookies from "js-cookie";

function AddItem() {
    const { roles, accessToken } = useContext(LoginContext);
    const navigate = useNavigate();

    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemImage, setItemImage] = useState("");
    const [itemDetailedImage, setItemDetailedImage] = useState("");
    const [itemColors, setItemColors] = useState([
        { colorName: "", stock: "" },
    ]);
    const [mainCategoryId, setMainCategoryId] = useState("1");
    const [subCategoryId, setSubCategoryId] = useState("1");

    const handleImageChange = (setImage) => async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64 = await convertBase64(file);
            setImage(base64);
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const mainCategories = {
        1: "하드베이트",
        2: "소프트베이트",
        3: "메탈지그&스푼",
        4: "스커트베이트",
        5: "각종장비",
    };

    const subCategories = {
        1: { 1: "플로팅미노우", 2: "메탈지그", 3: "타이라바", 4: "에기" },
        2: { 5: "새드", 6: "테일", 7: "호그" },
        3: { 8: "메탈지그", 9: "스푼" },
        4: { 10: "스피너베이트", 11: "스피너" },
        5: { 12: "낚시대", 13: "악세사리" },
    };

    useEffect(() => {
        if (roles == null || !roles.isAdmin) {
            alert("관리자만 접근 가능합니다.");
            navigate("/");
        }
    }, [roles]);

    const handleColorNameChange = (index, event) => {
        const values = [...itemColors];
        values[index].colorName = event.target.value;
        setItemColors(values);
    };

    const handleStockChange = (index, event) => {
        const values = [...itemColors];
        values[index].stock = event.target.value;
        setItemColors(values);
    };

    const handleAddFields = () => {
        setItemColors([...itemColors, { colorName: "", stock: "" }]);
    };

    const handleSubmit = async () => {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
            navigate("/login");
            return;
        }

        const itemData = {
            itemName,
            itemPrice,
            itemImage,
            itemDetailedImage,
            itemColors,
            mainCategoryId,
            subCategoryId,
        };

        try {
            await axios.post(
                `${process.env.REACT_APP_BACK_URL}/api/v1/items`,
                itemData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            alert("상품이 성공적으로 등록되었습니다.");
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_URL}/api/v1/items`,
                {
                    params: { subcategory: itemData.subCategoryId },
                }
            );
            navigate("/itemList", { state: { items: response.data } });
        } catch (error) {
            console.error(error);
            alert("상품 등록에 실패했습니다.");
        }
    };

    return (
        <div>
            <div class="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                <div class="flex flex-col justify-start items-start w-full space-y-9">
                    <div class="flex justify-start flex-col items-start space-y-2">
                        <p class="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-gray-50">
                            제품 등록
                        </p>
                    </div>

                    <div class="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                        <div class="p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5">
                            <div class="mt-8">
                                <label class="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                                    상품 이름
                                </label>
                                <input
                                    onChange={(e) =>
                                        setItemName(e.target.value)
                                    }
                                    class="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="상품 이름"
                                />
                            </div>

                            <label class="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                                상품 가격
                            </label>
                            <div class="mt-2 flex-col">
                                <div>
                                    <input
                                        onChange={(e) =>
                                            setItemPrice(e.target.value)
                                        }
                                        class="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                                        type="text"
                                        name=""
                                        id=""
                                        placeholder="상품 가격"
                                    />
                                </div>
                            </div>
                            <label class="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50"></label>
                            <div class="mt-2 flex-col">
                                <div class="flex-row flex">
                                    <label>메인 카테고리 ID:</label>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <select
                                        class="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                                        value={mainCategoryId}
                                        onChange={(e) => {
                                            setMainCategoryId(e.target.value);
                                            const firstSubCategoryKey =
                                                Object.keys(
                                                    subCategories[
                                                        e.target.value
                                                    ] || {}
                                                )[0];
                                            setSubCategoryId(
                                                firstSubCategoryKey
                                            );
                                        }}
                                    >
                                        {Object.entries(mainCategories).map(
                                            ([key, value]) => (
                                                <option key={key} value={key}>
                                                    {value}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div class="mt-2 flex-col">
                                <div class="flex-row flex">
                                    <label>서브 카테고리 ID:</label>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <select
                                        class="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                                        value={subCategoryId}
                                        onChange={(e) =>
                                            setSubCategoryId(e.target.value)
                                        }
                                    >
                                        {Object.entries(
                                            subCategories[mainCategoryId] || {}
                                        ).map(([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div class="mt-2 flex-col">
                                {itemColors.map((itemColor, index) => (
                                    <div class="flex-row flex">
                                        <div key={index}>
                                            <div class="mt-2 flex-col">
                                                <div class="flex-row flex">
                                                    <label>색상 이름:</label>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                class="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                                                value={itemColor.colorName}
                                                onChange={(event) =>
                                                    handleColorNameChange(
                                                        index,
                                                        event
                                                    )
                                                }
                                                placeholder="색상 이름"
                                            />
                                            <div class="mt-2 flex-col">
                                                <div class="flex-row flex">
                                                    <label>재고:</label>
                                                </div>
                                            </div>
                                            <input
                                                type="number"
                                                class="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                                                value={itemColor.stock}
                                                onChange={(event) =>
                                                    handleStockChange(
                                                        index,
                                                        event
                                                    )
                                                }
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
							<button
                                class="mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full"
                                onClick={handleAddFields}
                            >
                                색상 추가
                            </button>
                            <label class="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                                상품 이미지
                            </label>
                            <div class="mt-2 flex-col">
                                <div>
                                    <input
                                        onChange={handleImageChange(
                                            setItemImage
                                        )}
                                        class="file-input file-input-bordered w-full max-w-xs"
                                        type="file"
                                        name=""
                                        id=""
                                        placeholder="파일 입력 없음"
                                    />
                                </div>
                            </div>

                            <label class="mt-8 text-base leading-4 text-gray-800 dark:text-gray-50">
                                상품 상세 이미지
                            </label>
                            <div class="mt-2 flex-col">
                                <div>
                                    <input
                                        onChange={handleImageChange(
                                            setItemDetailedImage
                                        )}
                                        class="file-input file-input-bordered w-full max-w-xs"
                                        type="file"
                                        name=""
                                        id=""
                                        placeholder="Name on card"
                                    />
                                </div>
                            </div>
                            
                            <button
                                onClick={handleSubmit}
                                class="mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full"
                            >
                                <div>
                                    <p class="text-base leading-4">등록하기 </p>
                                </div>
                            </button>
                        </div>
						<div class="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
                            <div class="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                                <img src={itemImage} alt="headphones" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddItem;
