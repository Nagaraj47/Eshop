import React, { useState } from "react";
import axios from "axios";

function EditProduct(props) {
  const product = props.history.location.state.product;

  const _id = product._id;

  const [name, setName] = useState(product.name);
  const [img, setImg] = useState(product.img);
  const [category, setCategory] = useState(product.category);
  const [qty, setQty] = useState(product.qty);
  const [price, setPrice] = useState(product.price);
  const [des, setDes] = useState(product.des);

  const saveProduct = (e) => {
    e.preventDefault();

    axios
      .patch("/productlist/" + _id, { name, img, category, qty, price, des })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    props.history.push("/manageproducts");
  };
  return (
    <div className="form ">
      <form onSubmit={saveProduct}>
        <ul className="form-container-edit">
          <li>
            <h3>Edit Product Details </h3>
          </li>

          <li>
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label>Category</label>
            <input
              type="text"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </li>
          <li>
            <label>Image</label>
            <input
              type="text"
              name="image"
              id="image"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </li>
          <li>
            <label>Qty</label>
            <input
              type="text"
              name="qty"
              id="qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </li>
          <li>
            <label>Price</label>
            <input
              type="text"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </li>
          <li>
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={des}
              onChange={(e) => setDes(e.target.value)}
            />
          </li>
          <li>
            <div>
              <button type="submit" className="save-btn">
                Update
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
