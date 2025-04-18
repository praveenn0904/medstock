import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/Billing.css";

const Billing = () => {
  const [invoiceNo, setInvoiceNo] = useState(1);
  const [customer, setCustomer] = useState({
    name: "",
    gstin: "",
    place: "",
  });

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

  const getTotalValue = (item) => {
    const price = parseFloat(item.mrp) || 0;
    const qty = parseInt(item.qty) || 0;
    const discount = parseFloat(item.discount) || 0;
    return qty * price * ((100 - discount) / 100);
  };

  const totalTaxableValue = items.reduce((acc, item) => acc + getTotalValue(item), 0);
  const taxAmount = totalTaxableValue * 0.12;
  const grandTotal = totalTaxableValue + taxAmount;

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
      invoiceNo,
      date: new Date().toLocaleDateString(),
      customer,
      items,
      totalTaxableValue,
      taxAmount,
      grandTotal,
    };

    try {
      const res = await fetch("http://localhost:5000/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Invoice submitted successfully!");
        setInvoiceNo((prev) => prev + 1); // Increment invoice no
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="billing-wrapper">
      <div className="invoice" id="invoice">
        <header className="company-info">
          <center>
          <h2>Sree Amman Pharma Agency</h2>
          </center>
          <p>36, Pavadai Street, Erode - 638 001</p>
          <p>GSTIN: 33AYDPS3699G1Z1</p>
          <p>📞 9994553777 | 9443380004 | 9976853777</p><br></br>
          <hr />
        </header>

        <div className="meta-info">
          <div>
            <strong>Invoice No:</strong> {invoiceNo}
            <br />
            <strong>Invoice Date:</strong> {new Date().toLocaleDateString()}
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
          <p><strong>IGST (12%):</strong> {formatCurrency(taxAmount)}</p><br></br>
          <center>
          <h3>Grand Total: {formatCurrency(grandTotal)}</h3>
          </center>
        </div>
          <br></br>
          <hr></hr>
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
