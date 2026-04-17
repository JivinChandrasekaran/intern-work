import { useState, useEffect } from "react";
import Layout from "./Dashboard";

function LocationTracker() {

  const [serial, setSerial] = useState(() => {
    return localStorage.getItem("trackerInput") || "";
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("trackerData");
    return saved ? JSON.parse(saved) : [];
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("trackerData", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("trackerInput", serial);
  }, [serial]);

  const handleSearch = () => {
    if (!serial) return;

    const data = {
      serial,
      location: "Plant",
      status: "Filled",
      date: new Date().toLocaleDateString()
    };

    if (editIndex !== null) {
      const updated = [...history];
      updated[editIndex] = data;
      setHistory(updated);
      setEditIndex(null);
    } else {
      setHistory([...history, data]);
    }

    localStorage.removeItem("trackerInput");
    setSerial("");
  };

  const handleDelete = (i) => {
    setHistory(history.filter((_, index) => index !== i));
  };

  const handleEdit = (i) => {
    setSerial(history[i].serial);
    setEditIndex(i);
  };

  return (
    <Layout title="Location Tracker">

<div className="form-card">

  <div className="row">
    <div className="input-group">
      <label>Serial Number</label>
      <input value={serial} placeholder="e.g: ADX346982BG" onChange={(e) => setSerial(e.target.value)}
      />
    </div>
  </div>

  <button onClick={handleSearch}>
    {editIndex !== null ? "Update" : "Search"}
  </button>

</div>

      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Location</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {history.map((h, i) => (
            <tr key={i}>
              <td>{h.serial}</td>
              <td>{h.location}</td>
              <td>{h.status}</td>
              <td>{h.date}</td>

              <td>
                <button className="edit" onClick={() => handleEdit(i)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </Layout>
  );
}

export default LocationTracker;