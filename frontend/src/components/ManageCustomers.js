import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ManageCustomers(props) {
  const user = useSelector((state) => state.user);

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      axios.get("/users/customers").then((res) => {
        setCustomers(res.data);
      });
    };
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const handleDelete = (_id) => {
    axios.delete("/users/customers/" + _id).then((res) => console.log(res));
    window.location.reload(false);
  };

  return (
    <div>
      {!user.isAdmin ? (
        <div className="err-page">
          <h1>Only Admin can access this page</h1>
        </div>
      ) : (
        <div>
          <div className="customer-title">
            <h2>Customer Details</h2>
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
                  <b>Customer Id</b>
                </td>
                <td>
                  <b> Name</b>
                </td>
                <td>
                  <b>Email</b>
                </td>
                <td>
                  <b>Action</b>
                </td>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{customer._id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>
                      <div>
                        <button onClick={() => handleDelete(customer._id)}>
                          Remove
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

export default ManageCustomers;
