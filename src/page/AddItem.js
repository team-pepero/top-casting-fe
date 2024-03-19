import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from "../contexts/LoginContextProvider";
import Cookies from 'js-cookie';

function AddItem() {
    const { roles, accessToken } = useContext(LoginContext);
    const navigate = useNavigate();

    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemImage, setItemImage] = useState("");
    const [itemDetailedImage, setItemDetailedImage] = useState("");
    const [itemColors, setItemColors] = useState([{ colorName: "", stock: "" }]);
    const [mainCategoryId, setMainCategoryId] = useState("1");
    const [subCategoryId, setSubCategoryId] = useState("");

    const handleImageChange = (setImage) => async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        setImage(base64);
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
        "1": "하드베이트",
        "2": "소프트베이트",
        "3": "메탈지그&스푼",
        "4": "스커트베이트",
        "5": "각종장비"
    };

    const subCategories = {
        "1": { "1": "플로팅미노우", "2": "메탈지그", "3": "타이라바", "4": "에기" },
        "2": { "5": "새드", "6": "테일", "7": "호그" },
        "3": { "8": "메탈지그", "9": "스푼" },
        "4": { "10": "스피너베이트", "11": "스피너" },
        "5": { "12": "낚시대", "13": "악세사리" }
    };

    useEffect(() => {
        if (roles == null || !roles.isAdmin) {
            alert('관리자만 접근 가능합니다.');
            navigate('/');
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
            navigate('/login');
            return;
        }

        const itemData = {
            itemName,
            itemPrice,
            itemImage,
            itemDetailedImage,
            itemColors,
            mainCategoryId,
            subCategoryId
        };

        try {
            await axios.post(`http://localhost:8080/api/v1/items`, itemData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            alert('상품이 성공적으로 등록되었습니다.');
            const response = await axios.get('http://localhost:8080/api/v1/items', {
                params: { subcategory: itemData.subCategoryId }
            });
            navigate('/itemList', { state: { items: response.data } });
        } catch (error) {
            console.error(error);
            alert('상품 등록에 실패했습니다.');
        }
    };

    return (
        <div>
            <label>상품 이름:</label>
            <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} />

            <label>상품 가격:</label>
            <input type="number" value={itemPrice} onChange={e => setItemPrice(e.target.value)} />

            <label>상품 이미지:</label>
            <input type="file" onChange={handleImageChange(setItemImage)} />

            <label>상품 상세 이미지:</label>
            <input type="file" onChange={handleImageChange(setItemDetailedImage)} />

            <label>메인 카테고리 ID:</label>
            <select value={mainCategoryId} onChange={e => {
                setMainCategoryId(e.target.value);
                const firstSubCategoryKey = Object.keys(subCategories[e.target.value] || {})[0];
                setSubCategoryId(firstSubCategoryKey);
            }}>
                {Object.entries(mainCategories).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>

            <label>서브 카테고리 ID:</label>
            <select value={subCategoryId} onChange={e => setSubCategoryId(e.target.value)}>
                {Object.entries(subCategories[mainCategoryId] || {}).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>

            {itemColors.map((itemColor, index) => (
                <div key={index}>
                    <label>색상 이름:</label>
                    <input type="text" value={itemColor.colorName} onChange={event => handleColorNameChange(index, event)} />

                    <label>재고:</label>
                    <input type="number" value={itemColor.stock} onChange={event => handleStockChange(index, event)} />
                </div>
            ))}

            <button onClick={handleAddFields}>+</button>

            <button onClick={handleSubmit}>등록하기</button>
        </div>

    );
};

export default AddItem;
