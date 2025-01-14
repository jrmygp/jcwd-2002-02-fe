import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import KudaMesir from "../../public/Images/KudaMesir.png";

const UserCart = ({ checked = false, setCartChecked }) => {
  const formik = useFormik({
    initialValues: {
      quantity: 1,
    },
    onSubmit: () => {
      // eslint-disable-next-line no-console
      console.log("berhasil!");
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number().required().min(1),
    }),
  });

  const qtyHandler = (status) => {
    if (status === "increment") {
      if (formik.values.quantity === "") {
        formik.setFieldValue("quantity", 1);
        return;
      }
      if (formik.values.quantity >= 10) return;
      // eslint-disable-next-line radix
      formik.setFieldValue("quantity", parseInt(formik.values.quantity) + 1);
    } else if (status === "decrement") {
      if (formik.values.quantity < 1) return;

      formik.setFieldValue("quantity", formik.values.quantity - 1);
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: "28px" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onClick={setCartChecked}
                checked={checked}
                sx={{
                  color: "Brand.500",
                  "&.Mui-checked": {
                    color: "Brand.500",
                  },
                }}
              />
            }
          />
        </FormGroup>
        <Image src={KudaMesir} height="100px" width="100px" />
        <Stack width="100%" pl={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "16px" }}>
              Obat Kuat Kuda Mesir
            </Typography>
            <Stack direction="row" alignItems="center" alignSelf="start">
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "#B4B9C7",
                  fontSize: "14px",
                  mr: 2,
                }}
              >
                Rp 30.000
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Rp 25.000
              </Typography>
            </Stack>
          </Box>
          <Typography sx={{ fontSize: "12px", color: "#213360" }}>
            1 Strip
          </Typography>
        </Stack>
      </Box>
      <Stack direction="horizontal" width="100%" justifyContent="end">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "28px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              border: "transparent",
              "&:hover": {
                border: 0,
              },
            }}
          >
            Pindahkan Ke Wishlist
          </Button>

          <IconButton sx={{ color: "black", mr: "5px" }}>
            <DeleteIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              border: "1px solid #FF6600",
              maxWidth: 180,
              borderRadius: 3,
            }}
          >
            <Button
              onClick={() => qtyHandler("decrement")}
              variant="outlined"
              sx={{
                border: 0,
                fontWeight: "bold",
                "&:hover": {
                  border: 0,
                },
              }}
            >
              -
            </Button>
            <Typography
              sx={{
                border: 0,
                color: "#FF6600",
                width: "50px",
                textAlign: "center",
              }}
            >
              {formik.values.quantity}
            </Typography>
            <Button
              onClick={() => qtyHandler("increment")}
              variant="outlined"
              sx={{
                border: 0,
                fontWeight: "bold",
                "&:hover": {
                  border: 0,
                },
              }}
            >
              +
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
export default UserCart;
