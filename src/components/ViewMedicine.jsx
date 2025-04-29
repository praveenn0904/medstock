import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ViewMedicine.css";
import Sidebar from './SideBar';

const ViewMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicines();
  }, []);

  useEffect(() => {
    const filtered = medicines.filter(med =>
      med.name.toLowerCase().includes(search.toLowerCase()) ||
      med.id?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMedicines(filtered);
  }, [search, medicines]);

  const fetchMedicines = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/medicine/all');
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMedicines(data);
    } catch (err) {
      console.error('Error fetching medicines:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this medicine?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/medicine/delete/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("Medicine deleted successfully.");
        fetchMedicines();
      } else {
        alert("Failed to delete medicine.");
      }
    } catch (err) {
      console.error("Error deleting medicine:", err);
      alert("Error deleting medicine.");
    }
  };

  const handleEdit = (medicine) => {
    navigate(`/update-medicine/${medicine._id}`, { state: { medicine } });
  };

  if (loading) return <div className="loading">Loading medicines...</div>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="scrollable-content">
        <div className="view-medicine-container">
          <h2>Sre Amman Pharma Agency Inventory</h2>

          <input
            type="text"
            placeholder="Search by medicine name or ID..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <br /><br />

          {filteredMedicines.length === 0 ? (
            <p>No medicines found.</p>
          ) : (
            <div className="medicine-grid">
              {filteredMedicines.map((med) => (
                <div className="medicine-card" key={med._id}>
                  <h3>{med.name}</h3>
                  <p><strong>ID:</strong> {med.id || "N/A"}</p>
                  <p><strong>Qty:</strong> {med.quantity || "N/A"}</p>
                  <p><strong>Price:</strong> ₹{med.price || "N/A"}</p>
                  <p><strong>Manufactured:</strong> {med.manufacturedDate ? new Date(med.manufacturedDate).toLocaleDateString() : "N/A"}</p>
                  <p><strong>Expiry:</strong> {med.expiryDate ? new Date(med.expiryDate).toLocaleDateString() : "N/A"}</p>
                  <p><strong>Manufacturer:</strong> {med.manufacturer || "N/A"}</p>
                  <div className="button-group">
                    <button className="edit-btn" onClick={() => handleEdit(med)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(med._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMedicine;
