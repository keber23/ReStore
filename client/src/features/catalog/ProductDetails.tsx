import { Divider, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails() {
  const { basket } = useStoreContext();

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }

    id &&
      agent.Catalog.details(parseInt(id))
        .then((response) => setProduct(response))
        .catch((error) => console.log(error.response))
        .finally(() => setLoading(false));
  }, [id, item]);

  if (loading) {
    return <LoadingComponent message="Loading products..." />;
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body1">{product.brand}</Typography>
        <Typography variant="body1">{product.type}</Typography>
        <Typography variant="body2">{product.description}</Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in cart"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              loading={submitting}
              sx={{ height: "55px" }}
              onClick={() => {}}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
