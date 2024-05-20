import logo from "./logo.svg";
import "./App.css";

import { BackTop, Layout } from "antd";

import WelcomeSceen from "./screens/WelcomeScreen";

import React, { useContext, useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpScreen from "./screens/SignupScreen";
import SignInScreen from "./screens/SinginScreen";
import AdminDashbaord from "./screens/AdminDashbaord";
import ShopDashboard from "./screens/ShopDashboard";
import AppMain from "./components/AppMain";
import Auth from "./components/Auth";

const { Header, Content, Footer, Sider } = Layout;
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const checkLoggedIn = async () => {
    let user = localStorage.getItem("user");
    console.log("check login");
    if (user != null) {
      setLoggedIn(true);
      setLoadingUser(false);
    } else {
      setLoggedIn(false);
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, [loggedIn]);

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<WelcomeSceen />} />
    //     <Route path="/register" element={<SignUpScreen />} />
    //     <Route path="/login" element={<SignInScreen />} />
    //     <Route path="/admin" element={<AdminDashbaord />} />
    //     <Route path="/shopdash" element={<ShopDashboard />} />
    //   </Routes>
    // </Router>

    <div>
      {loadingUser ? (
        <div>Loading Data ... </div>
      ) : (
        <div> {loggedIn ? <AppMain /> : <Auth />} </div>
      )}
    </div>
  );
}

export default App;
