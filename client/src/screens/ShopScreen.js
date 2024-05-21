import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Axios from "axios";
const ShopScreen = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const products = await Axios.get("/products");

    console.log("products ", products.data);
    setProducts(products.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Shop screen</h1>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        {products.map((element) => {
          return (
            <div
              onClick={() => {
                navigate("/product/" + element._id, { state: element });
              }}
            >
              <Grid item>
                <Card sx={{ width: 300 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image={element.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {element.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {element.description}
                      </Typography>
                      <Typography variant="h5" color="text.secondary">
                        {element.price} DT
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        category : {element.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Available : {element.inStock ? "Yes" : "No"}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default ShopScreen;
