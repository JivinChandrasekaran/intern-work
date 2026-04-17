import { useState, useEffect } from "react";
import Layout from "./Dashboard";

function DispatchEntry() {

  const [formData, setFormData] = useState({
    dispatchId: "",
    customerName: "",
    vehicle: "",
    driver:"",
    route:"",
    cylinders: [{ serial: "", gasType: "" , qty:"" }]
  });

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("dispatchData");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("dispatchData", JSON.stringify(entries));
  }, [entries]);

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
      cylinders: [...formData.cylinders, { serial: "", gasType: "" ,qty:""}]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...entries];
      updated[editIndex] = formData;
      setEntries(updated);
      setEditIndex(null);
    } else {
      setEntries([...entries, formData]);
    }

    setFormData({
      dispatchId: "",
      customerName: "",
      vehicle: "",
      driver:"",
      route:"",
      cylinders: [{ serial: "", gasType: "",qty:"" }]
    });
  };

  const handleDelete = (i) => {
    setEntries(entries.filter((_, index) => index !== i));
  };

  const handleEdit = (i) => {
    setFormData(entries[i]);
    setEditIndex(i);
  };

  const filtered = entries.filter((e) =>
    e.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Dispatch Entry">
      <form onSubmit={handleSubmit} className="form-card">
       <div className="row">  
        <input name="dispatchId" value={formData.dispatchId} onChange={handleChange} placeholder="Dispatch ID" />
        <input name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer Name" />
        <input name="vehicle" value={formData.vehicle} onChange={handleChange} placeholder="Vehicle Number" />

         </div>
         <div className="row">
        <input name="driver" value={formData.driver} onChange={handleChange} placeholder="Driver Name" />
        <input name="route" value={formData.route} onChange={handleChange} placeholder="Route" />
      
      </div>
        {formData.cylinders.map((cyl, i) => (
          <div key={i}>
             <div className="row">
            <input name="serial" value={cyl.serial} onChange={(e) => handleCylinderChange(i, e)} placeholder="Serial Number" />
            <select name="gasType" value={cyl.gasType} placeholder="Gas Type" onChange={(e) => handleCylinderChange(i, e)}>
               <option value="">Select Gas Type</option> 
               <option value="O2">Oxygen</option>
                <option value="N2">Nitorgen</option> 
                <option value="Co2">Carbon Dioxide</option> 
                </select>  
            <input name="qty" value={formData.qty} onChange={handleChange} placeholder="Quantity" />
        </div>
          </div>
        ))}

        <button type="button" onClick={addCylinder}>Add Cylinder</button>
        <button type="submit">{editIndex !== null ? "Update" : "Submit"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Serial</th>
            <th>ID</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Gas</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((e, i) =>
            e.cylinders.map((c, j) => (
              <tr key={`${i}-${j}`}>
                <td>{c.serial}</td>
                <td>{e.dispatchId}</td>
                <td>{e.customerName}</td>
                <td>{e.vehicle}</td>
                <td>{c.gasType}</td>
                <td>{c.qty}</td>
                <td>
                  <button onClick={() => handleEdit(i)}>Edit</button>
                  <button className="btn delete" onClick={() => handleDelete(i)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </Layout>
  );
}

export default DispatchEntry;