import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/Billing.css";

const Billing = () => {
  const [customer, setCustomer] = useState({
    name: "",
    gstin: "",
    place: "",
  });

  const [items, setItems] = useState([
    {
      id: "",
      name: "",
      mfgDate: "",
      expDate: "",
      qty: 1,
      mrp: "",
      discount: 0,
    },
  ]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? dateStr
      : date.toLocaleDateString("en-GB"); // DD/MM/YYYY
  };

  const handleItemChange = async (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "qty" ? parseInt(value) : value;

    if (field === "id") {
      updated[index].name = "";
      updated[index].mfgDate = "";
      updated[index].expDate = "";
      updated[index].mrp = "";

      if (value.trim()) {
        try {
          const res = await fetch(`https://medstock-backend-oymi.onrender.com/api/medicine/${value}`);
          if (res.ok) {
            const data = await res.json();
            updated[index].name = data.name;
            updated[index].mfgDate = formatDate(data.manufacturedDate);
            updated[index].expDate = formatDate(data.expiryDate);
            updated[index].mrp = data.price;
          } else {
            console.warn("Medicine not found for ID:", value);
          }
        } catch (err) {
          console.error("Error fetching medicine info by ID", err);
        }
      }
    }

    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: "",
        name: "",
        mfgDate: "",
        expDate: "",
        qty: 1,
        mrp: "",
        discount: 0,
      },
    ]);
  };

  const getTotalValue = (item) => {
    const price = parseFloat(item.mrp) || 0;
    const qty = parseInt(item.qty) || 0;
    const discount = parseFloat(item.discount) || 0;
    return qty * price * ((100 - discount) / 100);
  };

  const totalTaxableValue = items.reduce((acc, item) => acc + getTotalValue(item), 0);
  const cgst = totalTaxableValue * 0.06;
  const sgst = totalTaxableValue * 0.06;
  const grandTotal = totalTaxableValue + cgst + sgst;

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

  const submitInvoice = async () => {
    const payload = {
      date: new Date().toLocaleDateString("en-GB"),
      customer,
      items,
      totalTaxableValue,
      cgst,
      sgst,
      grandTotal,
    };

    try {
      const res = await fetch("https://medstock-backend-oymi.onrender.com/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Invoice submission failed: " + data.message);
        return;
      }

      const stockRes = await fetch("https://medstock-backend-oymi.onrender.com/api/medicine/reduce-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (stockRes.ok) {
        alert("Invoice submitted and stock updated!");
      } else {
        const stockError = await stockRes.json();
        alert("Invoice saved, but stock update failed:\n" + stockError.message);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred while submitting invoice.");
    }
  };

  return (
    <div className="billing-wrapper">
      <div className="invoice" id="invoice">
        <header className="company-info">
          <center>
            <h2>Sre Amman Pharma Agency</h2>
          </center>
          <p>36, Pavadai Street, Erode - 638 001</p>
          <p>GSTIN: 33AYDPS3699G1Z1</p>
          <p>📞 9994553777 | 9443380004 | 9976853777</p>
          <br />
          <hr />
        </header>

        <div className="meta-info">
          <div>
            <strong>Invoice Date:</strong> {new Date().toLocaleDateString("en-GB")}
          </div>
          <div>
            <label>
              Customer:
              <input
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="Customer Name"
              />
            </label>
            <label>
              GSTIN:
              <input
                value={customer.gstin}
                onChange={(e) => setCustomer({ ...customer, gstin: e.target.value })}
                placeholder="GSTIN"
              />
            </label>
            <label>
              Place of Supply:
              <input
                value={customer.place}
                onChange={(e) => setCustomer({ ...customer, place: e.target.value })}
                placeholder="Place of Supply"
              />
            </label>
          </div>
        </div>

        <table className="billing-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>ID</th>
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
                <td>
                  <input
                    value={item.id}
                    onChange={(e) => handleItemChange(idx, "id", e.target.value)}
                    placeholder="Medicine ID"
                  />
                </td>
                <td>
                  <input
                    value={item.name}
                    onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={item.mfgDate}
                    onChange={(e) => handleItemChange(idx, "mfgDate", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    value={item.expDate}
                    onChange={(e) => handleItemChange(idx, "expDate", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.mrp}
                    onChange={(e) => handleItemChange(idx, "mrp", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.discount}
                    onChange={(e) => handleItemChange(idx, "discount", e.target.value)}
                  />
                </td>
                <td>{formatCurrency(getTotalValue(item))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addItem} className="add-btn">+ Add Item</button>

        <div className="totals">
          <p><strong>Taxable Total:</strong> {formatCurrency(totalTaxableValue)}</p>
          <p><strong>CGST (6%):</strong> {formatCurrency(cgst)}</p>
          <p><strong>SGST (6%):</strong> {formatCurrency(sgst)}</p>
          <br />
          <center>
            <h3>Grand Total: {formatCurrency(grandTotal)}</h3>
          </center>
        </div>

        <br />
        <hr />
        <footer>
          <p><strong>Bank Details:</strong> ICICI, A/C: 2715500356, IFSC: ICIC045F</p>
          <p><strong>UPI ID:</strong> ifox@icici</p>
          <p>Thanks for your order! We look forward to working with you again soon.</p>
        </footer>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button className="checkout-btn" onClick={downloadPDF}>Download PDF</button>
        <button className="checkout-btn" onClick={submitInvoice} style={{ marginLeft: "1rem" }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Billing;
