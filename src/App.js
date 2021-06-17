import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Join";
import About from "./component/About";
import ProductBracelets from './component/ProductBracelets'
import ProductCouples from './component/ProductCouples';
import ProductNecklaces from './component/ProductNecklaces'
import ProductRings from './component/ProductRings';
import Cart from './component/ProductCart';
import Address from './component/SavedAddress';


function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
      <Route path="/join" component={Register} />
      <Route path="/about" component={About} />
      <Route path="/bracelets" component={ProductBracelets} />
      <Route path="/couples" component={ProductCouples} />
      <Route path="/necklaces" component={ProductNecklaces} />
      <Route path="/rings" component={ProductRings} />
      <Route path="/address" component={Address} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);