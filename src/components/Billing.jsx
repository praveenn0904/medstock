import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/Billing.css";

const Billing = () => {
  const [items, setItems] = useState([
    {
      name: "",
      mfgDate: "",
      expDate: "",
      qty: 1,
      mrp: "",
      discount: 0,
    },
  ]);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "qty" ? parseInt(value) : value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        name: "",
        mfgDate: "",
        expDate: "",
        qty: 1,
        mrp: "",
        discount: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const getTotalValue = (item) => {
    const price = parseFloat(item.mrp) || 0;
    const qty = parseInt(item.qty) || 0;
    const discount = parseFloat(item.discount) || 0;
    return qty * price * ((100 - discount) / 100);
  };

  const totalTaxableValue = items.reduce((acc, item) => acc + getTotalValue(item), 0);
  const taxAmount1 = totalTaxableValue * 0.12;
  const taxAmount2 = totalTaxableValue * 0.12;
  const grandTotal = totalTaxableValue + taxAmount1+taxAmount2;

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(num);

  const downloadPDF = () => {
    const input = document.getElementById("invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div className="billing-wrapper">
      <div className="invoice" id="invoice">
        <header className="company-info">
          <center>
          <h2>Sre Amman Pharma Agency</h2>
          <h6>36, Pavadai Street, Erode - 638 001.</h6><br></br>
          <h6>GST: 33AYDPS3699G1Z1</h6>  
          <p>📞 9994553777 || 9443380004 || 9976853777</p><br></br>
          </center>
          <hr />
        </header>

        <div className="meta-info">
          <div>
            <strong>Invoice No:</strong> 001
            <br />
            <strong>Invoice Date:</strong> {new Date().toLocaleDateString()}
          </div>
          <div>
            <strong>Customer:</strong> HealthPro Pharmacy
            <br />
            <strong>Place of Supply:</strong> Maharashtra
          </div>
        </div>

        <table className="billing-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
             <th>MFG</th>
              <th>Expiry</th>
              <th>Qty</th>
              <th>MRP</th>
              <th>Disc (%)</th>
              <th>Taxable Value</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td><input value={item.name} onChange={(e) => handleItemChange(idx, "name", e.target.value)} /></td>
                <td><input value={item.mfgDate} onChange={(e) => handleItemChange(idx, "mfgDate", e.target.value)} /></td>
                <td><input value={item.expDate} onChange={(e) => handleItemChange(idx, "expDate", e.target.value)} /></td>
                <td><input type="number" value={item.qty} onChange={(e) => handleItemChange(idx, "qty", e.target.value)} /></td>
                <td><input type="number" value={item.mrp} onChange={(e) => handleItemChange(idx, "mrp", e.target.value)} /></td>
                <td><input type="number" value={item.discount} onChange={(e) => handleItemChange(idx, "discount", e.target.value)} /></td>
                <td>{formatCurrency(getTotalValue(item))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addItem} className="add-btn">+ Add Item</button>

        <div className="totals">
          <p><strong>Taxable Total:</strong> {formatCurrency(totalTaxableValue)}</p>
          <p><strong>CGST (12%):</strong> {formatCurrency(taxAmount1)}</p>
          <p><strong>SGST (12%):</strong> {formatCurrency(taxAmount2)}</p>
          <br></br>
          <center>
          <h3>Grand Total: {formatCurrency(grandTotal)}</h3>
          </center>
        </div>

        <footer>
          <p>Thanks for your order! We look forward to working with you again soon.</p>
        </footer>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button className="checkout-btn" onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default Billing;
