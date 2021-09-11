import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/actions/cartActions";

function Cart(props) {
  const cartItems = useSelector((state) => state.allProducts.cart);

  const dispatch = useDispatch();

  const remove = (_id) => {
    dispatch(removeFromCart(_id));
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <h1 style={{ padding: "230px 0px 0px 580px" }}> Cart Is Empty</h1>
      ) : (
        <div className="container">
          <h1 style={{ paddingLeft: "280px " }}>Shopping Cart</h1>
          <div className="cart">
            <div className="products">
              {cartItems.map((item) => (
                <div key={item._id} className="product">
                  <img src={item.img} alt={item.name} />
                  <div className="product-info">
                    <br />
                    <br />
                    <h3 className="product-name">{item.name}</h3>
                    <h4 className="product-price">Rs.{item.price}</h4>
                    <p className="product-remove">
                      <button
                        className="btn-danger"
                        onClick={() => remove(item._id)}
                      >
                        Remove
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <p>
                <span>Number of Items</span>
                <span> {cartItems.length}</span>
              </p>
              <p>
                <span>Total Price</span>
                <span>
                  Rs.{cartItems.reduce((sum, item) => sum + item.price, 0)}
                </span>
              </p>

              <br />
              <button onClick={() => props.history.push("/payment")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
