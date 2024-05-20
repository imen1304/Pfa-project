import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import {
  AutoComplete,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";

import { DatePicker, Space } from "antd";

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Divider, Row, Steps } from "antd";
import { Option } from "antd/es/mentions";

const { RangePicker } = DatePicker;
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

const SingleProductScreen = () => {
  const [step, setStep] = useState(0);
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState({});
  const [openUpdateDialog, OpenUpdateDialog] = useState(false);

  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [checkoutResponse, setCheckoutResponse] = useState();

  const [price, setPrice] = useState(0);
  const { state } = useLocation();
  const [form] = Form.useForm();

  const [numberOfDays, setNumberOfDays] = useState(1);

  const handleDatePicker = async (date, dateString) => {
    var start = new Date(dateString[0]);
    var end = new Date(dateString[1]);

    var days = end.getTime() - start.getTime();

    days = days / (1000 * 60 * 60 * 24);

    console.log("days ", days);
    setNumberOfDays(days);

    let pricTotal =
      parseInt(selectedContract.price) * parseInt(days) + parseInt(state.price);
    console.log("total price ", pricTotal);
    setPrice(pricTotal);
  };

  const checkout = async () => {
    var fromvalues = form.getFieldValue();

    const body = {
      insuranceId: selectedContract._id,
      name: fromvalues.name,
      email: fromvalues.email,
      begin_date: new Date(fromvalues.datepicker[0]),
      end_date: new Date(fromvalues.datepicker[1]),
      price: price,
      productId: state._id,
    };

    const response = await Axios.post("/purchase/create", body);
    console.log("form values ", response.data);
    if (response.data.success) {
      setCheckoutResponse(response.data);
      OpenUpdateDialog(true);
    } else {
      setOpenErrorDialog(true);
    }
  };

  const collapes = [
    {
      key: "1",
      label: "Product Price",
      children: (
        <Row>
          <Col span={12}>{state.title}</Col>
          <Col span={12}> {state.price} DT</Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Services",
      children: (
        <div>
          <Row>
            <Col span={12}>Insurance</Col>
            <Col span={12}> Price per day {selectedContract.price ?? 0} DT</Col>
          </Row>

          <Row>
            <Col span={12}>Total Insurance</Col>
            <Col span={12}>
              {" "}
              Total{" "}
              {selectedContract.price != null
                ? parseInt(selectedContract.price) * numberOfDays
                : 0}{" "}
              DT
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "3",
      label: "Total",
      children: (
        <div>
          <Row>
            <Col span={12}>Total </Col>
            <Col span={12}> Total {price} DT</Col>
          </Row>
        </div>
      ),
    },
  ];
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const registration = await Axios.post("/users/register", values);

    if (registration.data.Success == "Success") {
      // redirect to home screen
      // save user in local browser data
      navigate("/");
    } else {
      // display error message
    }
  };

  const onChange = (key) => {
    console.log(key);
  };

  const onChangeSelect = async (event) => {
    contracts.forEach((element) => {
      if (element.title == event) {
        setSelectedContract(element);
      }
    });
  };

  const getProducts = async () => {
    const response = await Axios.get("/insurance/");

    console.log("products ", response.data);
    setContracts(response.data.insurances);
  };

  useEffect(() => {
    getProducts();
  }, []);
  const next = () => {
    setStep(step + 1);
  };
  const prev = () => {
    setStep(step - 1);
  };
  const description = " ";
  const items = [
    {
      title: "Step One",
      description,
    },
    {
      title: "In Progress",
      description,
    },
    {
      title: "Waiting",
      description,
    },
  ];

  return (
    <div>
      <Divider> {state.title}</Divider>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Card style={{ width: 700 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                width="200"
                image={"http://localhost:5000/" + state.image}
                alt="green iguana"
              />
            </CardActionArea>

            <Steps
              current={step}
              percent={60}
              labelPlacement="vertical"
              items={items}
            />

            {step == 0 ? (
              <Grid>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Marque: {state.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {state.description}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    Price : {state.price} DT
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    category : {state.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available : {state.inStock ? "Yes" : "No"}
                  </Typography>
                </CardContent>
              </Grid>
            ) : (
              <div></div>
            )}

            {step == 1 ? (
              <Grid>
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
                    name="contract"
                    label="Contract"
                    rules={[
                      {
                        required: true,
                        message: "Please select role!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Contract Type"
                      onChange={onChangeSelect}
                    >
                      {contracts.map((value) => (
                        <Option key={value.title} value={value.title}>
                          {value.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item name="price" label="price / day">
                    {selectedContract.price ?? 0} DT
                  </Form.Item>

                  <Form.Item name="price" label="Termes of contract">
                    {selectedContract.description ?? ""}
                  </Form.Item>
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
                    name="name"
                    label="name"
                    tooltip="What do you want others to call you?"
                    rules={[
                      {
                        required: true,
                        message: "Please input your nickname!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="datepicker" label="Start / begin">
                    <RangePicker onChange={handleDatePicker} />
                  </Form.Item>
                </Form>
              </Grid>
            ) : (
              <div></div>
            )}

            {step == 2 ? (
              <Grid>
                <Typography variant="body2" color="text.secondary">
                  Payment
                </Typography>
                <Collapse
                  items={collapes}
                  defaultActiveKey={["1"]}
                  onChange={onChange}
                />
              </Grid>
            ) : (
              <div></div>
            )}

            {step == 2 && (
              <Row justify={"end"} style={{ padding: "1rem" }}>
                <Button type="primary" onClick={checkout}>
                  Checkout
                </Button>
              </Row>
            )}

            <Row>
              {step > 0 && (
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={() => prev()}
                >
                  Previous
                </Button>
              )}

              {step < items.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
            </Row>
          </Card>
        </Grid>
      </Grid>

      <Modal
        width={500}
        title={`Boutique Smarphones `}
        visible={openUpdateDialog}
        onOk={() => {
          OpenUpdateDialog(false);
        }}
        onCancel={() => {
          OpenUpdateDialog(false);
        }}
        cancelText="Cancel"
      >
        <div>
          {openUpdateDialog ? (
            <div>
              <div> Transaction complet </div>{" "}
              <div> Your email : {checkoutResponse.email ?? ""}</div>
              <div> Your Password : {checkoutResponse.password ?? ""}</div>
            </div>
          ) : (
            <div> Error </div>
          )}
        </div>
      </Modal>

      <Modal
        width={500}
        title={`error `}
        visible={openErrorDialog}
        onOk={() => {
          setOpenErrorDialog(false);
        }}
        onCancel={() => {
          setOpenErrorDialog(false);
        }}
        cancelText="Cancel"
      >
        <div>
          <div> Email already exists </div>
        </div>
      </Modal>
    </div>
  );
};

export default SingleProductScreen;
