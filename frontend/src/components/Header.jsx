import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../contexts/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import { Toaster } from "react-hot-toast";


function Header() {
  const { isLoggedIn, logout, signup, login } = useAuth();

  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div style={{ display: "flex" }}>
          {isLoggedIn ? (
            <>
              <NavigationLink
                bg="white"
                to="/chat"
                text="Go to chat"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                text="logout"
                textColor="white"
                onClick={logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="white"
                to="/"
                text="Login"
                textColor="black"
                onClick={login}
              />
              <NavigationLink
                bg="#51538f"
                to="/signup"
                text="Signup"
                textColor="white"
                onClick={signup}
              />
            </>
          )}
        </div>
      </Toolbar>
      <Toaster position="top-right" />
    </AppBar>
  );
}

export default Header;
