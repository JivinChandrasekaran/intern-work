import { useState,useEffect } from "react";
import Layout from "./Dashboard";

function ReturnEntry() {
 const [formData, setFormData] = useState({
    returnId: "",
    customerName: "",
    date: "",
    cylinders: [{ serial: "", condition: "Good" }]
  });

    const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("returnData");
    return saved ? JSON.parse(saved) : [];
    });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("returnData"));
    if (saved) setEntries(saved);
    }, []);

    useEffect(() => {
    localStorage.setItem("returnData", JSON.stringify(entries));
    }, [entries]);

    useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem("returnForm"));
    if (savedForm) setFormData(savedForm);
    }, []);

    useEffect(() => {
    localStorage.setItem("returnForm", JSON.stringify(formData));
    }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCylinderChange = (i, e) => {
    const updated = [...formData.cylinders];
    updated[i][e.target.name] = e.target.value;
    setFormData({ ...formData, cylinders: updated });
  };

  const addCylinder = () => {
    setFormData({
      ...formData,
      cylinders: [...formData.cylinders, { serial: "", condition: "Good" }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    setEntries([...entries, formData]);
    localStorage.setItem("returnData", JSON.stringify([...entries, formData]));
    if (editIndex !== null) {
      const updated = [...entries];
      updated[editIndex] = formData;
      setEntries(updated);
      setEditIndex(null);
    } else {
      setEntries([...entries, formData]);
    }
    
    setFormData({
        returnId: "",
        customerName: "",
        date: "",
        cylinders: [{ serial: "", condition: "Good" }]    

    });
    
  };
  const handleDelete = (i) => {
    setEntries(entries.filter((_, index) => index !== i));
  };

  // 🔥 EDIT
  const handleEdit = (i) => {
    setFormData(entries[i]);
    setEditIndex(i);
  };
  return (
    <Layout title="Return Entry">

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="row">
          <input name="returnId" placeholder="Return ID" onChange={handleChange} />
          <input name="customerName" placeholder="Customer Name" onChange={handleChange} />
          <input type="date" name="date" placeholder="date" onChange={handleChange} />
        </div>

        {formData.cylinders.map((cyl, i) => (
          <div className="row" key={i}>
            <input name="serial" placeholder="Serial Number" onChange={(e) => handleCylinderChange(i, e)} />
            <select name="condition" onChange={(e) => handleCylinderChange(i, e)}>
              <option>Good</option>
              <option>Damaged</option>
            </select>
          </div>
        ))}

        <button type="button" className="btn" onClick={addCylinder}>Add Cylinder</button>
        <button type="submit">
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Serial Number</th>
            <th>Customer Name</th>
            <th>Condition</th>
            <th>Date</th>
            <th>Actions</th>
            
          </tr>
        </thead>

        <tbody>
          {entries.map((e, i) =>
            e.cylinders.map((c, j) => (
              <tr key={`${i}-${j}`}>
                <td>{e.returnId}</td>
                <td>{c.serial}</td>
                <td>{e.customerName}</td>
                <td>{c.condition}</td>
                <td>{e.date}</td>
                

                <td>
                  <button className="edit" onClick={() => handleEdit(i)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(i)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </Layout>
  );
}

export default ReturnEntry;