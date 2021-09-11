import React, { useState } from "react";
import axios from "axios";

function EditProduct(props) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [des, setDes] = useState("");
  const [err, setErr] = useState("");

  const addProduct = (e) => {
    e.preventDefault();
    if (
      (name !== "") &
      (img !== "") &
      (category !== "") &
      (qty !== "") &
      (price !== "") &
      (des !== "")
    ) {
      axios
        .post("/addProduct", { name, img, category, qty, price, des })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      props.history.push("/manageproducts");
    } else {
      setErr("*All fields are required");
    }
  };
  return (
    <div className="form ">
      <form onSubmit={addProduct}>
        <ul className="form-container-edit">
          <li>
            <h3>Add Product </h3>
          </li>
          {err !== "" && <li style={{ color: "red" }}>{err}</li>}
          <li>
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label>Category</label>
            <input
              type="text"
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </li>
          <li>
            <label>Image</label>
            <input
              type="text"
              name="image"
              id="image"
              onChange={(e) => setImg(e.target.value)}
            />
          </li>
          <li>
            <label>Qty</label>
            <input
              type="text"
              name="qty"
              id="qty"
              onChange={(e) => setQty(e.target.value)}
            />
          </li>
          <li>
            <label>Price</label>
            <input
              type="text"
              name="price"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </li>
          <li>
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={(e) => setDes(e.target.value)}
            />
          </li>
          <li>
            <div>
              <button type="submit" className="save-btn">
                Add
              </button>
              <button
                className="cancel-btn"
                onClick={() => props.history.push("/manageproducts")}
              >
                Cancel
              </button>
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default EditProduct;
