import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const alignOptions = ["flex-start", "center", "flex-end"];
const SignInScreen = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const login = await Axios.post("/users/singin", values);

    if (login.data.success) {
      localStorage.setItem("user", JSON.stringify(login.data.user));

      if (login.data.user.role == "admin") {
        navigate("/admin");
        window.location.reload();
      } else if (login.data.user.role == "shop_agent") {
        navigate("/shopdash");
        window.location.reload();
      } else if (login.data.user.role == "customer") {
        navigate("/customer", { replace: true });
        window.location.reload();
      } else if (login.data.user.role == "insurance_agent") {
        navigate("/insurance", { replace: true });
        window.location.reload();
      } else if (login.data.user.role == "repair_agent") {
        navigate("/repairdash", { replace: true });
        window.location.reload();
      }
    } else {
      // display error message
    }
  };

  return (
    <div>
      <Flex
        gap="middle"
        align="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
            padding: "1rem",
            width: 700,
            backgroundColor: "#D5F2FC",
            borderRadius: "12px",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          {/* <div style={{ flexDirection: "row" }}> */}

          {/* </div> */}
          <Row>
            <Col span={5}>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Sign in
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Flex>
    </div>
  );
};

export default SignInScreen;
