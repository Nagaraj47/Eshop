import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/actions/productAction";

const ProductList = () => {
  const productList = useSelector((state) => state.allProducts.products);

  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("Loading...");
  const [products, setPro] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search !== "") {
      setPro(
        productList.filter(
          (item) => item.name === search || item.category === search
        )
      );
    } else {
      setPro(productList);
    }
  };

  const fetchProducts = () => {
    axios.get("/productlist").then((res) => {
      dispatch(setProducts(res.data));
      setPro(res.data);
      setMsg("No Products Found");
    });
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <form style={{ padding: "20px 550px" }} onSubmit={handleSearch}>
        <input
          type="text"
          style={({ width: "200px" }, { padding: "5px" })}
          onChange={(e) => setSearch(e.target.value.trim())}
        />
        <button type="submit" style={{ padding: "5px" }}>
          Search
        </button>
      </form>
      {products.length === 0 && <h1 className="list-msg">{msg}</h1>}
      <div className="ui grid container" style={{ paddingTop: "20px" }}>
        {products.map((product) => (
          <div key={product._id}>
            <div className="three column row" style={{ margin: "30px" }}>
              <Link to={"/productlist/" + product._id}>
                <div className="column">
                  <div className="ui link cards">
                    <div className="card">
                      <div className="image">
                        <img src={product.img} alt={product.name}></img>
                      </div>
                      <div className="content">
                        <div className="header">{product.name}</div>
                        <div className="meta price">
                          <b>Rs.{product.price}</b>
                        </div>
                        <div className="meta">
                          <b>{product.category}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
