import React, { useEffect, useState } from "react";
import axios from "axios";
import Model from "react-modal";
import { useSelector } from "react-redux";

function ManageProducts(props) {
  const user = useSelector((state) => state.user);

  const [products, setitems] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = () => {
      axios.get("/productlist").then((res) => {
        setitems(res.data);
      });
    };
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const handleDelete = (_id) => {
    axios.delete("/productlist/" + _id).then((res) => console.log(res));
    setOpen(true);
    window.location.reload(false);
  };

  const handleEdit = (product) => {
    props.history.push({
      pathname: "/editproduct",
      state: { product: product },
    });
  };

  return (
    <div>
      <Model
        isOpen={open}
        className="details-model"
        style={{ overlay: { backgroundColor: "none" } }}
      >
        <h4>Deleted Successfully</h4>
      </Model>
      {!user.isAdmin ? (
        <div className="err-page">
          <h1>Only Admin can access this page</h1>
        </div>
      ) : (
        <div>
          <div className="add-product" style={{ padding: "30px 0px 0px 30px" }}>
            <button onClick={() => props.history.push("/addProduct")}>
              Add New Product
            </button>
          </div>
          <div
            className="product-table"
            style={{ padding: "30px 0px 0px 20px" }}
          >
            <table>
              <thead>
                <td>
                  <b>Index</b>
                </td>
                <td>
                  <b>Image</b>
                </td>
                <td>
                  <b>Product Id</b>
                </td>
                <td>
                  <b>Product Name</b>
                </td>
                <td>
                  <b>Category</b>
                </td>
                <td>
                  <b>Qty</b>
                </td>
                <td>
                  <b>Price</b>
                </td>
                <td>
                  <b>Action</b>
                </td>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img src={product.img} alt={product.name}></img>
                    </td>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.qty}</td>
                    <td>{product.price}</td>
                    <td>
                      <div>
                        <button onClick={() => handleDelete(product._id)}>
                          Delete
                        </button>
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <button onClick={() => handleEdit(product)}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProducts;
