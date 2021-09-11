import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Payment(props) {
  const [name, setName] = useState("");
  const [cardno, setCardno] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [err, setErr] = useState("");

  const cartItems = useSelector((state) => state.allProducts.cart);
  const user = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    if (address !== "") {
      const userId = user.userId;
      axios.post("/addorder", { userId, address, cartItems });
      props.history.push({
        pathname: "/order",
        state: { address: address },
      });
    } else {
      setErr("Enter a Valid Address!");
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h3>Payment Details </h3>
          </li>
          {err !== "" && <li style={{ color: "red" }}>{err}</li>}
          <li>
            <label>Name Of Card Holder</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label>Card Number</label>
            <input
              type="text"
              name="cardno"
              id="cardno"
              value={cardno}
              onChange={(e) => setCardno(e.target.value)}
            />
          </li>

          <li>
            <label>Cvv</label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </li>
          <li>
            <label>Address</label>
            <textarea
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="signin-btn">
              Place Order
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default Payment;
