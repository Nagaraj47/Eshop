import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function ManageOrders(props) {
  const user = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      axios.get("/orders").then((res) => {
        setOrders(res.data);
      });
    };
    fetchProducts();
    // eslint-disable-next-line
  }, []);
  const handleView = (_id) => {
    props.history.push({
      pathname: "/vieworder",
      state: { orderId: _id },
    });
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
            <h2>Order Details</h2>
          </div>
          <div
            className="product-table"
            style={{ padding: "30px 0px 0px 20px" }}
          >
            {orders.length === 0 ? (
              <h3 style={{ paddingLeft: "40px" }}>No Orders</h3>
            ) : (
              <table>
                <thead>
                  <td>
                    <b>Index</b>
                  </td>
                  <td>
                    <b>Order Id</b>
                  </td>
                  <td>
                    <b> CustomerId</b>
                  </td>
                  <td>
                    <b>Action</b>
                  </td>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{order._id}</td>
                      <td>{order.customerId}</td>
                      <td>
                        <div>
                          <button onClick={() => handleView(order._id)}>
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageOrders;
