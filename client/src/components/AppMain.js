import "../App.css";

import { Layout } from "antd";

import WelcomeSceen from "../screens/WelcomeScreen";

import React, { useContext, useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminDashbaord from "../screens/AdminDashbaord";
import ShopDashboard from "../screens/ShopDashboard";
import CustomNavbar from "./customNavbar";
import ShopScreen from "../screens/ShopScreen";
import InsuranceScreen from "../screens/InsuranceScreen";
import CustomerScreen from "../screens/CustomerScreen";
import SingleProductScreen from "../screens/ProductSingleScreen";
import RepairScreen from "../screens/RepairDash";

const { Header, Content, Footer, Sider } = Layout;

function AppMain() {
  return (
    <Router>
      <CustomNavbar />

      <Routes>
        {/* <Route path="/" element={<WelcomeSceen />} /> */}
        <Route path="/admin" element={<AdminDashbaord />} />
        <Route path="/shopdash" element={<ShopDashboard />} />
        <Route path="/shop" element={<ShopScreen />} />
        <Route path="/product/:id" element={<SingleProductScreen />} />
        <Route path="/insurance" element={<InsuranceScreen />} />
        <Route path="/customer" element={<CustomerScreen />} />
        <Route path="/repairdash" element={<RepairScreen />} />
      </Routes>
    </Router>
  );
}

export default AppMain;
