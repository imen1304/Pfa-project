import { Grid, IconButton } from "@mui/material";
import { Divider, Modal, Space, Switch, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Axios from "axios";
import React, { useEffect, useState } from "react";

import { Button, Form, Input } from "antd";

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
const InsuranceScreen = () => {
  const [form] = Form.useForm();
  const [insurances, setInsurances] = React.useState([]);
  const [openCreateDialog, OpenCreateDialog] = useState(false);

  const [openUpdateDialog, OpenUpdateDialog] = useState(false);

  const [updateInsurance, SetUpdateInsurance] = useState({});

  const getInsurances = async () => {
    const response = await Axios.get("/insurance/");

    setInsurances(response.data.insurances);
  };

  const onFinishUpdate = async (values) => {
    console.log("update ", values);
    values.insuranceId = updateInsurance._id;

    const response = await Axios.post("/insurance/updateone", values);

    console.log("update ", response.data);
    if (response.data.success) {
      OpenUpdateDialog(false);
      getInsurances();
    } else {
      // display error message
    }
  };

  const DelteUser = async (insuranceId) => {
    console.log("user id ", insuranceId);
    const body = {
      insuranceId: insuranceId,
    };
    const deleteInsurance = await Axios.post("/insurance/delteone", body);
    console.log("deleted", deleteInsurance.data);

    getInsurances();
  };

  useEffect(() => {
    getInsurances();
  }, []);

  const updateFunction = async (record) => {
    SetUpdateInsurance(record);
    OpenUpdateDialog(true);
  };

  const onFinish = async (values) => {
    console.log("create ", values);
    const createInsurance = await Axios.post("/insurance/create", values);
    console.log("create ", createInsurance.data);
    if (createInsurance.data.success) {
      OpenCreateDialog(false);
      getInsurances();
    } else {
      // display error message
    }
  };
  return (
    <div>
      <div style={{ padding: "2rem" }}>
        <h3>Insurances </h3>
        <Table dataSource={insurances}>
          <Column title="Title " dataIndex="title" key="title" />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />

          <Column title="Price / Day (DT)" dataIndex="price" key="price" />
          <Column
            title="Theft Protection"
            dataIndex="theft_protection"
            key="theft_protection"
            render={(_, value) =>
              value.theft_protection ? (
                <Tag color="green">Available</Tag>
              ) : (
                <Tag color="red">Not available</Tag>
              )
            }
          />

          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  variant="contained"
                  onClick={() => updateFunction(record)}
                >
                  update
                </Button>
                <Button
                  variant="contained"
                  onClick={() => DelteUser(record._id)}
                >
                  Delete Insurance
                </Button>
              </Space>
            )}
          />
        </Table>
        <h3>
          Add another Insurance{" "}
          <IconButton
            aria-label="create"
            size="large"
            onClick={() => OpenCreateDialog(true)}
          >
            <AddCircleIcon fontSize="inherit" />
          </IconButton>
        </h3>
      </div>

      <Modal
        width={500}
        title={`Create new Insurance`}
        visible={openCreateDialog}
        onOk={() => {
          OpenCreateDialog(false);
        }}
        onCancel={() => {
          OpenCreateDialog(false);
        }}
        cancelText="Cancel"
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            //  maxWidth: 600,
            padding: "1rem",
            // width: 700,
            backgroundColor: "#D5F2FC",
            borderRadius: "12px",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="title"
            label="Tiltle"
            rules={[
              {
                required: true,
                message: "Please input your Title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price / day (DT)"
            rules={[
              {
                required: true,
                message: "Please input the price!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="theft_protection"
            label="Theft Protection"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input Description",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={300} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        width={500}
        title={`Update Insurance : ${updateInsurance.title}`}
        visible={openUpdateDialog}
        onOk={() => {
          OpenUpdateDialog(false);
        }}
        onCancel={() => {
          OpenUpdateDialog(false);
        }}
        cancelText="Cancel"
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinishUpdate}
          style={{
            //  maxWidth: 600,
            padding: "1rem",
            // width: 700,
            backgroundColor: "#D5F2FC",
            borderRadius: "12px",
          }}
          scrollToFirstError
        >
          <Form.Item name="title" label="Tiltle">
            <Input value={updateInsurance.title} />
          </Form.Item>

          <Form.Item name="price" label="Price / day (DT)">
            <Input />
          </Form.Item>

          <Form.Item
            name="theft_protection"
            label="Theft Protection"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea showCount maxLength={300} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InsuranceScreen;
