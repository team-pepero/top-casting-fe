import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderSheet = () => {

    const location = useLocation();
    const orderData = location.state.orderData;
    const API_ROOT = process.env.REACT_APP_API_ROOT;

    const [orderDetails, setOrderDetails] = useState({
        customerName: '',
        customerAddress: '',
        customerPhoneNumber: '',
        totalItemQuantity: 0,
        totalItemPrice: 0,
        addOrderItemDtos: [{ cartItemId: '', itemQuantity: 0, itemPrice: 0 }],
    });

    const navigate = useNavigate();


    useEffect(() => {
        console.log(orderData);
        const totalQuantity = orderDetails.addOrderItemDtos.reduce((total, item) => total + Number(item.itemQuantity), 0);
        const totalPrice = orderDetails.addOrderItemDtos.reduce((total, item) => total + (Number(item.itemQuantity) * Number(item.itemPrice)), 0);

        setOrderDetails(prevDetails => ({
            ...prevDetails,
            totalItemQuantity: totalQuantity,
            totalItemPrice: totalPrice
        }));
    }, [orderDetails.addOrderItemDtos]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleItemChange = (index, e) => {
        const updatedItems = orderDetails.addOrderItemDtos.map((item, i) =>
            i === index ? { ...item, [e.target.name]: e.target.value } : item
        );
        setOrderDetails(prevDetails => ({
            ...prevDetails,
            addOrderItemDtos: updatedItems
        }));
    };

    const addItem = () => {
        setOrderDetails(prevDetails => ({
            ...prevDetails,
            addOrderItemDtos: [...prevDetails.addOrderItemDtos, { cartItemId: '', itemQuantity: 0, itemPrice: 0 }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_ROOT}/api/v1/order`, orderDetails);
            console.log('Order added successfully:', response.data);
            const orderId = response.data.orderId;
            navigate(`/payment?orderId=${orderId}`);

        } catch (error) {
            console.error('Failed to add order:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="customerName"
                value={orderDetails.customerName}
                onChange={handleInputChange}
                placeholder="Customer Name"
                required
            />
            <input
                name="customerAddress"
                value={orderDetails.customerAddress}
                onChange={handleInputChange}
                placeholder="Customer Address"
                required
            />
            <input
                name="customerPhoneNumber"
                value={orderDetails.customerPhoneNumber}
                onChange={handleInputChange}
                placeholder="Customer Phone Number"
                required
            />
            {orderDetails.addOrderItemDtos.map((item, index) => (
                <div key={index}>
                    <input
                        name="cartItemId"
                        value={item.cartItemId}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Cart Item ID"
                        required
                    />
                    <input
                        name="itemQuantity"
                        type="number"
                        value={item.itemQuantity}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Item Quantity"
                        required
                    />
                    <input
                        name="itemPrice"
                        type="number"
                        value={item.itemPrice}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Item Price"
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={addItem}>Add Item</button>
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderSheet;