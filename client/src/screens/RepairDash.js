import React, { useEffect, useState } from "react";
import Axios from "axios";
import { MessageOutlined } from "@ant-design/icons";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Card, Modal } from "antd";
const RepairScreen = () => {
  const [claimToUpdate, setClaimToUpdate] = useState({});
  const [openUpdateDialog, OpenUpdateDialog] = useState(false);
  const [claims, setClaims] = React.useState([]);
  const getClaims = async () => {
    const response = await Axios.get("/claims");

    console.log("claims ", response.data);
    setClaims(response.data.claims);
  };

  const updateClaim = async (status) => {
    const body = {
      claimId: claimToUpdate._id,
      status: status,
    };
    const response = await Axios.post("/claims/updateone", body);
    console.log("accepted", response.data);

    getClaims();
  };

  useEffect(() => {
    getClaims();
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
      <h1>Repair screen</h1>
      <Grid
        container
        sm={12}
        md={12}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        <Card item style={{ margin: "8px" }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="left">User name</TableCell>
                <TableCell align="left">Theft</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Claim Status</TableCell>
                <TableCell align="left">Creation Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            {claims.map((element) => {
              return (
                <TableRow key={element._id}>
                  <TableCell align="left">{element.user.name}</TableCell>

                  <TableCell align="center">
                    {" "}
                    {element.thft ? "stolen" : "not stolen"}{" "}
                  </TableCell>

                  <TableCell align="center">{element.description}</TableCell>
                  <TableCell align="left">{element.status}</TableCell>
                  <TableCell align="left">
                    {formatDate(element.createdAt)}
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Purchase Details" >
                      <Button
                   sx={{
              backgroundColor: '#1677ff',
              color: 'white',
             minWidth: '150px', // Adjust the width as needed
             height: '40px',
             '&:hover': {
            backgroundColor: 'gray',
          },
        }}
                        // style={{ width: "100%" }}
                        type="primary"
                        shape="circle"
                      
                        icon={<MessageOutlined />}
                        onClick={() => {
                          //   getPurchase();
                          OpenUpdateDialog(true);
                          setClaimToUpdate(element);
                        }}
                      > Purchase Details</Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        </Card>
      </Grid>

      <Modal
        width={500}
        title={`Claim`}
        visible={openUpdateDialog}
        onOk={() => {
          // deleteProduct(productToUpdate._id);
          OpenUpdateDialog(false);
        }}
        onCancel={() => {
          OpenUpdateDialog(false);
        }}
        okText="Update Status"
        cancelText="Cancel"
      >
        <Grid container>
          <Button
            variant="contained"
            size="small"
            onClick={() => updateClaim("repair")}
          >
            repair
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => updateClaim("refund")}
          >
            Refund
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => updateClaim("reject")}
          >
            Reject
          </Button>
        </Grid>
      </Modal>
    </div>
  );
};

export default RepairScreen;
