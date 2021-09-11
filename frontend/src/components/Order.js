import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Order(props) {
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.allProducts.cart);
  const address = props.history.location.state.address;

  useEffect(() => {
    const toMail = user.email;
    let Items = "";
    for (let i = 0; i < cartItems.length; i++) {
      Items += cartItems[i].name + " , ";
    }

    axios
      .post("/sendmail", { toMail, Items })
      .then((res) => console.log(res.data));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="order-cls">
        <h2>Your order has been placed.. </h2>
      </div>
      <div className="user-details">
        <h4>User Info:</h4>
        <h5>{user.name}</h5>
        <h5>Email : {user.email}</h5>
      </div>
      <div className="address">
        <h4>Deliver To:</h4>
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
          {cartItems.map((item, index) => (
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
              <h5>Rs.{cartItems.reduce((sum, item) => sum + item.price, 0)}</h5>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Order;
