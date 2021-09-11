import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import SignIn from "./components/SignIn";
import React, { Component } from "react";
import Register from "./components/Register";
import ManageProducts from "./components/ManageProducts";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import Payment from "./components/Payment";
import Order from "./components/Order";
import ManageCustomers from "./components/ManageCustomers";
import ManageOrders from "./components/ManageOrders";
import ViewOrder from "./components/ViewOrder";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar />
          <div className="body">
            <Switch>
              <Route path="/" exact={true} component={Home} />

              <Route path="/productlist" exact={true} component={ProductList} />

              <Route path="/productlist/:_id" component={ProductDetails} />

              <Route path="/cart" exact component={Cart} />

              <Route path="/manageproducts" exact component={ManageProducts} />

              <Route path="/editproduct" exact component={EditProduct} />

              <Route path="/addproduct" exact component={AddProduct} />

              <Route path="/signin" exact component={SignIn} />

              <Route path="/register" exact component={Register} />

              <Route path="/payment" exact component={Payment} />

              <Route path="/order" exact component={Order} />

              <Route
                path="/managecustomers"
                exact
                component={ManageCustomers}
              />

              <Route path="/manageorders" exact component={ManageOrders} />

              <Route path="/vieworder" exact component={ViewOrder} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
