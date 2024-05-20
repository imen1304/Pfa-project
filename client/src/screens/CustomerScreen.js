import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Divider, Form, Modal, Input, Button, Switch } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const CustomerScreen = () => {
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
  const [form] = Form.useForm();
  const [purchases, setPurchases] = useState([]);
  const [openCreateDialog, setopenCreateDialog] = useState(false);
  const [contract, setContract] = useState({});
  const getProducts = async () => {
    let userlocal = JSON.parse(localStorage.getItem("user"));
    const body = {
      userId: userlocal._id,
    };
    const products = await Axios.post("/purchase/getbyuserid", body);

    console.log("products ", products.data.purchases);
    setPurchases(products.data.purchases);
  };

  const onFinish = async (values) => {
    let userlocal = JSON.parse(localStorage.getItem("user"));
    console.log("create ", values);
    const body = {
      theft: form.getFieldValue().theft,
      description: form.getFieldValue().description,
      userId: userlocal._id,
      purchaseId: contract._id,
    };
    const response = await Axios.post("/claim/create", body);
    console.log("create ", response.data);
    if (response.data.success) {
      setopenCreateDialog(false);
      // getInsurances();
    } else {
      // display error message
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const formatDate = (d) => {
    var date = new Date(d);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };
  return (
    <div>
      <Divider>Customer Contracts</Divider>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={4}
        style={{ marginTop: "1rem" }}
      >
        {purchases.map((element) => {
          return (
            <div key={element._id}>
              <Grid item spacing={2}>
                <Card sx={{ width: 400 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                      ></Typography>
                      <Typography variant="body2" color="text.secondary">
                        Marque : {element.product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Color : {element.product.color}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Valide from : {formatDate(element.begin_date)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        End from : {formatDate(element.end_date)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      ></Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      ></Typography>
                    </CardContent>
                  </CardActionArea>

                  <Button
                    type="primary"
                    onClick={() => {
                      setContract(element);
                      setopenCreateDialog(true);
                    }}
                  >
                    Create complain
                  </Button>
                </Card>
              </Grid>
            </div>
          );
        })}
      </Grid>

      <Modal
        width={500}
        title={`Create reclamation`}
        visible={openCreateDialog}
        onOk={() => {
          setopenCreateDialog(false);
        }}
        onCancel={() => {
          setopenCreateDialog(false);
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
            name="theft"
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
    </div>
  );
};

export default CustomerScreen;
