import React, { useState, useEffect } from "react";
import axios from "axios";
import Model from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/actions/cartActions";

const ProductDetails = (props) => {
  const [isAdded, setIsAdded] = useState(false);
  const [product, setPro] = useState({});
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);

  const { _id } = useParams();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProduct = () => {
      axios.get("/productlist/" + _id).then((res) => {
        setPro(res.data);
        setloading(false);
      });
    };

    fetchProduct();
  }, [_id]);

  const add = (id) => {
    if (user.isLogged) {
      dispatch(addToCart(id));
      setIsAdded(!isAdded);
    } else {
      setOpen(true);
    }
  };

  return (
    <div>
      <Model
        isOpen={open}
        className="details-model"
        style={{ overlay: { backgroundColor: "none" } }}
      >
        <h2>Sign-in to Continue</h2>
        <button onClick={() => props.history.push("/signin")}>Sign-in</button>
        <button onClick={() => setOpen(false)}>Cancel</button>
      </Model>

      {loading ? (
        <h1 style={{ padding: "230px 0px 0px 580px" }}>Loading...</h1>
      ) : (
        <div className="ui grid container" style={{ paddingTop: "15px" }}>
          <div className="ui placeholder segment">
            <div className="ui two column stackable center aligned grid">
              <div className="ui vertical divider"></div>
              <div className="middle aligned row">
                <div className="column lp">
                  <img
                    className="ui flud image"
                    src={product.img}
                    alt={product.name}
                  />
                </div>
                <div className="column rp">
                  <h1>{product.name}</h1>
                  <div style={{ paddingTop: "20px" }}>
                    <h3 className="ui teal tag label">Rs.{product.price}</h3>
                  </div>
                  <div style={{ paddingTop: "20px" }}>
                    <h3 className="ui grey block label">{product.qty}</h3>
                  </div>
                  <div style={{ padding: "20px 0px" }}>
                    <h3 className="ui brown block label">{product.category}</h3>
                  </div>
                  <h6 style={{ paddingBottom: "20px" }}>{product.des}</h6>
                  <div>
                    <button
                      className="add-btn"
                      onClick={() => add(product._id)}
                      disabled={isAdded}
                    >
                      {isAdded ? "Added" : "Add To Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
