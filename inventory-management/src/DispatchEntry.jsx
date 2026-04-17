import { useState, useEffect } from "react";
import Layout from "./Dashboard";

function DispatchEntry() {

  const [formData, setFormData] = useState({
    dispatchId: "",
    customerName: "",
    vehicle: "",
    driver:"",
    route:"",
    date:"",
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
      date:"",
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
    <div className="input-group">
      <label>Dispatch ID *</label>
      <input name="dispatchId" value={formData.dispatchId} placeholder="e.g:347856"onChange={handleChange} />
    </div>

    <div className="input-group">
      <label>Customer Name *</label>
      <input name="customerName" value={formData.customerName} placeholder="e.g:Jivin C"onChange={handleChange} />
    </div>
  
    <div className="input-group">
      <label>Vehicle Number *</label>
      <input name="vehicle" value={formData.vehicle} placeholder=" e.g:TN 37 BX 9999" onChange={handleChange} />
    </div>
  </div>
    <div className="row">
    <div className="input-group">
      <label>Driver Name</label>
      <input name="driver" value={formData.driver} placeholder="e.g:Hari Senthil"onChange={handleChange} />
    </div>
  
    <div className="input-group">
      <label>Route</label>
      <input name="route" value={formData.route} placeholder="e.g: T Nagar" onChange={handleChange} />
    </div>

        <div className="input-group">
      <label>Date</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} />
    </div>
  
  </div>

  <h4>Cylinder Details</h4>

  {formData.cylinders.map((cyl, i) => (
    <div className="row" key={i}>

      <div className="input-group">
        <label>Serial Number *</label>
        <input name="serial" value={cyl.serial} placeholder="e.g: AX23BG456" onChange={(e) => handleCylinderChange(i, e)}/>
      </div>

      <div className="input-group">
        <label>Gas Type *</label>
        <select name="gasType" value={cyl.gasType} onChange={(e) => handleCylinderChange(i, e)}>
          <option value="">Select</option>
          <option value="O2">Oxygen</option>
          <option value="N2">Nitrogen</option>
          <option value="CO2">Carbon Dioxide</option>
        </select>
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
            <th>Date</th>
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
                <td>{c.date}</td>
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