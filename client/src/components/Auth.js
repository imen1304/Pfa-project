import "../App.css";

import { BackTop, Layout } from "antd";

import React, { useContext, useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpScreen from "../screens/SignupScreen";
import SignInScreen from "../screens/SinginScreen";

import AuthNavbar from "./AuthNavbar";
import WelcomeScreen from "../screens/WelcomeScreen";
import ShopScreen from "../screens/ShopScreen";
import SingleProductScreen from "../screens/ProductSingleScreen";

const { Header, Content, Footer, Sider } = Layout;
function Auth() {
  return (
    <Router>
      <AuthNavbar />
      <Routes>
        <Route path="/" element={<ShopScreen />} />
        <Route path="/product/:id" element={<SingleProductScreen />} />
        <Route path="/login" element={<SignInScreen />} />
        <Route path="/register" element={<SignUpScreen />} />
      </Routes>
    </Router>
  );
}

export default Auth;
