import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewOrder(props) {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState("");
  const [items, setitems] = useState([]);
  const fetchOrder = () => {
    const _id = props.history.location.state.orderId;
    axios.get("/orders/" + _id).then((res) => {
      setAddress(res.data.location);
      setitems(res.data.items);
      axios.get("/users/customers/" + res.data.customerId).then((res) => {
        setUser(res.data);
      });
    });
  };
  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <button
        className="back-btn"
        onClick={() => props.history.push("/manageorders")}
      >
        Back
      </button>
      <div className="user-details">
        <h4>Customer Info:</h4>
        <h5>{user.name}</h5>
        <h5>Email : {user.email}</h5>
      </div>
      <div className="address">
        <h4>Delivery Address:</h4>
        <h5>{address}</h5>
      </div>
      <div className="ordered-product">
        <table>
          <tr>
            <td>
              <h4>Index</h4>
            </td>
            <td>
              <h4>Image</h4>
            </td>
            <td>
              <h4>Details</h4>
            </td>
            <td>
              <h4>Price</h4>
            </td>
          </tr>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>
                <img src={item.img} alt={item.name} />
              </td>
              <td>
                <div>{item.name}</div>
                <div>{item.qty}</div>
              </td>
              <td>{item.price}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
              <h5>Total</h5>
            </td>
            <td>
              <h5>Rs.{items.reduce((sum, item) => sum + item.price, 0)}</h5>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default ViewOrder;
