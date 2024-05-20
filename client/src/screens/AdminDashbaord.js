import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import CustomNavbar from "../components/customNavbar";
import AdminDash from "./AdminDash";
//
import { Space, Table, Tag } from "antd";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Axios from "axios";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AdminDashboard = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [users, setUsers] = React.useState([]);

  const getUsers = async () => {
    console.log("users");
    const users = await Axios.get("/users");

    setUsers(users.data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const AccepteUser = async (userId) => {
    console.log("user id ", userId);
    const body = {
      userId: userId,
      accepted: true,
    };
    const accepteUser = await Axios.post("/users/verifyUser", body);
    console.log("accepted", accepteUser.data);

    getUsers();
  };

  const DelteUser = async (userId) => {
    console.log("user id ", userId);
    const body = {
      userId: userId,
    };
    const accepteUser = await Axios.post("/users/delteone", body);
    console.log("accepted", accepteUser.data);

    getUsers();
  };

  return (
    <div>
      <div style={{ padding: "2rem" }}>
        <h3>Users </h3>
        <Table dataSource={users}>
          <Column title="Name " dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />

          <Column title="role" dataIndex="role" key="role" />
          <Column
            title="Account Status"
            dataIndex="account_status"
            key="account_status"
          />
          <Column
            title="Application"
            dataIndex="application"
            key="application"
          />

          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  variant="contained"
                  onClick={() => AccepteUser(record._id)}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  onClick={() => DelteUser(record._id)}
                >
                  Delete User
                </Button>
              </Space>
            )}
          />
        </Table>
      </div>
    </div>
  );
};
export default AdminDashboard;
