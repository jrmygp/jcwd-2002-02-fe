import {
  Avatar,
  Box,
  // Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "redux/reducer/auth";
import jsCookie from "js-cookie";
import Router from "next/router";
import shopee from "../../public/Images/shopee.png";

const Nav = () => {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutBtnHandler = () => {
    dispatch(logout());

    jsCookie.remove("user_auth_token");
    Router.push("/login");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottom: 1,
        borderColor: "white",
        boxShadow: "0 0 15px -3px #FF6600",
        paddingX: 5,
        paddingY: 1,
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: "rgb(255, 255, 255, 0.9)",
      }}
    >
      <Box display={{ xs: "none", md: "block" }}>
        <Link href="/">
          <Image src={shopee} height="80px" width="210px" />
        </Link>
      </Box>
      <FormControl
        sx={{
          m: 1,
          width: 800,
        }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-search" sx={{ ml: 2 }}>
          Cari Obat, Suplemen, Vitamin, produk Kesehatan
        </InputLabel>
        <OutlinedInput
          id="outlined-search"
          sx={{ borderRadius: 2 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" sx={{ mr: 1 }}>
                <BsSearch />
              </IconButton>
            </InputAdornment>
          }
          label="Cari Obat, Suplemen, Vitamin, produk Kesehatan yuk"
        />
      </FormControl>

      {/* USER NOT LOGGED IN */}

      {/* <Button
        variant="outlined"
        sx={{
          mr: 3,
          ml: 3,
          width: 150,
          height: 50,
        }}
      >
        Masuk
      </Button>
      <Button
        variant="contained"
        sx={{
          width: 150,
          height: 50,
          boxShadow: 0,
          "&:hover": {
            boxShadow: 0,
          },
        }}
      >
        Daftar
      </Button> */}

      {/* USER LOGGED IN */}
      <Link href="/keranjang">
        <IconButton sx={{ ml: "50px" }}>
          <ShoppingCartIcon sx={{ color: "Brand.500" }} />
        </IconButton>
      </Link>
      <IconButton sx={{ ml: "50px" }}>
        <NotificationsIcon sx={{ color: "Brand.500" }} />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center", ml: "52px" }}>
        <Avatar
          onClick={handleClick}
          src={userSelector?.photo_profile}
          sx={{ ":hover": { cursor: "pointer" } }}
        />
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem>
            <Link href="/profile-page">Profil Saya</Link>
          </MenuItem>
          <MenuItem onClick={logoutBtnHandler}>Keluar</MenuItem>
        </Menu>
        <Typography sx={{ ml: "14px" }}>
          {userSelector?.nama?.length > 5
            ? `${userSelector?.nama?.slice(0, 4)}...`
            : userSelector?.nama}
        </Typography>
      </Box>
    </Box>
  );
};

export default Nav;
