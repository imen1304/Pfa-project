import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/customNavbar";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { MessageOutlined } from "@ant-design/icons";
import {
  CardActionArea,
  CardActions,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Axios from "axios";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  ColorPicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Space,
  Switch,
  Upload,
} from "antd";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ShopDashboard = () => {
  const [products, setProducts] = React.useState([]);
  const [openUpdateDialog, OpenUpdateDialog] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState({});

  const categories = ["pc", "smartphone", "home_appliance"];

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    var fd = new FormData();

    fd.append("title", values.title);
    fd.append("description", values.description);
    fd.append("image", values.image[0].originFileObj);
    fd.append("price", values.price);
    fd.append("color", values.color);
    fd.append("inStock", values.inStock);
    fd.append("category", values.category);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const product = await Axios.post("/products/create", fd, config);

    getProducts();
    console.log("product ", product.data);
  };

  const getProducts = async () => {
    const products = await Axios.get("/products");

    console.log("products ", products.data);
    setProducts(products.data.products);
  };

  const deleteProduct = async (productId) => {
    console.log("user id ", productId);
    const body = {
      productId: productId,
    };
    const deleteProduct = await Axios.post("/products/deleteone", body);
    console.log("accepted", deleteProduct.data);

    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid>
          <div onClick={() => {}}>Add Product</div>
          <Divider />
          <Form
            className="form-product"
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
              "color-picker": null,
            }}
            style={{
              maxWidth: 600,
              width: 700,
            }}
          >
            <Form.Item
              name="title"
              label="Title"
              tooltip="Product title"
              rules={[
                {
                  required: true,
                  message: "Please input product title!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="inStock" label="Available" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              tooltip="Product price with TND"
              rules={[
                {
                  required: true,
                  message: "Please input product price!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please select role!",
                },
              ]}
            >
              <Select placeholder="select the category">
                <Option value="smartphone">Smart Phone</Option>
                <Option value="pc">PC</Option>
                <Option value="home_appliance">Home Appliance</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="product Description"
              rules={[
                {
                  required: true,
                  message: "Please input Intro",
                },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
              name="image"
              label="Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="color"
              label="Color"
              rules={[
                {
                  required: true,
                  message: "Please input a color!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="reset">reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </Grid>
      </Grid>

      <Grid
        container
        sm={12}
        md={12}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        {categories.map((value, key) => (
          <Card title={value} key={value} item style={{ margin: "8px" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Price (DT)</TableCell>
                  <TableCell align="left">Available</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              {products.map((element) => {
                if (element.category == value)
                  return (
                    <TableRow key={element._id}>
                      <TableCell align="left">{element.title}</TableCell>

                      <TableCell align="center">
                        <CardMedia
                          component="img"
                          height="100"
                          image={"http://localhost:5000/" + element.image}
                          alt="green iguana"
                        />
                      </TableCell>

                      <TableCell align="center">
                        {element.description}
                      </TableCell>

                      <TableCell align="left">{element.price}</TableCell>
                      <TableCell align="left">
                        {element.inStock ? "available" : "not available"}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Purchase Details">
                          <Button
                            // style={{ width: "100%" }}
                            type="primary"
                            shape="circle"
                            icon={<MessageOutlined />}
                            onClick={() => {
                              //   getPurchase();
                              OpenUpdateDialog(true);
                              setProductToUpdate(element);
                            }}
                          ></Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
              })}
            </Table>
          </Card>
        ))}
      </Grid>

      <Modal
        width={500}
        title={`Product title : ${productToUpdate.title}`}
        visible={openUpdateDialog}
        onOk={() => {
          deleteProduct(productToUpdate._id);
          OpenUpdateDialog(false);
        }}
        onCancel={() => {
          OpenUpdateDialog(false);
        }}
        okText="Delete Product"
        cancelText="Cancel"
      >
        <CardMedia
          component="img"
          height="200"
          image={"http://localhost:5000/" + productToUpdate.image}
          alt="green iguana"
        />
        {/* <InputNumber
          defaultValue={offerToUpdate.price}
          style={{
            width: 200,
          }}
          min="0"
          max="80000"
          step="0.001"
          onChange={onChangeOfferPrice}
        /> */}
        {/* <TextField
          required
          id="outlined-required"
          defaultValue={offerToUpdate.price}
          onChange={onChangeOfferPrice}
        /> */}
      </Modal>
    </div>
  );
};

export default ShopDashboard;
