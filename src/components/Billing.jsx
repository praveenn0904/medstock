// src/components/Billing.jsx
import React, { useState } from "react";
import "../styles/Billing.css";

const Billing = () => {
  const [items, setItems] = useState([{ name: "", quantity: 1, price: "" }]);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "quantity" ? parseInt(value) : value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: "" }]);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      return sum + item.quantity * price;
    }, 0);
  };

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(num);

  return (
    <div className="billing-container">
      <h2>Billing Page</h2>
      {items.map((item, index) => (
        <div key={index} className="billing-item">
          <input
            type="text"
            placeholder="Medicine Name"
            value={item.name}
            onChange={(e) => handleItemChange(index, "name", e.target.value)}
          />
          <input
            type="number"
            min="1"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, "price", e.target.value)}
          />
          <button onClick={() => removeItem(index)} className="remove-btn">✖</button>
        </div>
      ))}
      <button onClick={addItem} className="add-btn">+ Add Item</button>

      <div className="billing-summary">
        <h3>Total Amount:</h3>
        <p className="total">{formatCurrency(getTotal())}</p>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Billing;
