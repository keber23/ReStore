// import { useEffect, useState } from "react";
// import { Basket } from "../../app/models/basket";
// import agent from "../../app/api/agent";
// import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

export default function BasketPage() {
  //   const [loading, setLoading] = useState(true);
  //   const [basket, setBasket] = useState<Basket | null>(null);

  //   useEffect(() => {
  //     agent.Basket.get()
  //       .then((basket) => setBasket(basket))
  //       .catch((error) => console.log(error))
  //       .finally(() => setLoading(false));
  //   }, []);

  //   if (loading) return <LoadingComponent message="Loading basket..." />;

  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => {
              return (
                <TableRow
                  key={item.productId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.pictureUrl}
                        alt={item.name}
                        style={{ height: 50, marginRight: 20 }}
                      />
                      <span>{item.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(item.price)}
                  </TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      loading={
                        status.loading && status.name === "rem" + item.name
                      }
                      onClick={() =>
                        handleRemoveItem(item.productId, 1, "rem" + item.name)
                      }
                      color="error"
                    >
                      <Remove />
                    </LoadingButton>
                    {item.quantity}
                    <LoadingButton
                      loading={
                        status.loading && status.name === "add" + item.name
                      }
                      onClick={() =>
                        handleAddItem(item.productId, "add" + item.name)
                      }
                      color="secondary"
                    >
                      <Add />
                    </LoadingButton>
                  </TableCell>
                  <TableCell align="right">
                    {currencyFormat(item.price * item.quantity)}
                  </TableCell>
                  <TableCell align="right">
                    <LoadingButton
                      loading={
                        status.loading && status.name === "del" + item.name
                      }
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          item.quantity,
                          "del" + item.name
                        )
                      }
                      color="error"
                    >
                      <Delete />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
