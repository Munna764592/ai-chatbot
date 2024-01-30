import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import robot from "../components/images/robot.png";
import CustomizedInput from "../components/shared/CustomizedInput";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      return navigate("/chat");
    }
  }, [isLoggedIn]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      toast.loading("Signing In", { id: "login" });
      await login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In failed", { id: "login" });
    }
  };
  return (
    <div>
      <Box width={"100%"} height={"100%"} display="flex" flex={1}>
        <Box
          padding={8}
          mt={8}
          display={{ md: "flex", sm: "none", xs: "none" }}>
          <img src={robot} alt="robot" style={{ width: "300px" }} />
        </Box>
        <Box
          display={"flex"}
          flex={{ xs: 1, md: 0.5 }}
          justifyContent={"center"}
          alignItems={"center"}
          padding={2}
          ml={"auto"}
          mt={"16"}>
          <form
            onSubmit={handleSubmit}
            style={{
              margin: "auto",
              padding: "30px",
              boxShadow: "10px 10px 20px #000",
              borderRadius: "10px",
              border: "none"
              //   width: "300px"
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}>
              <Typography
                variant="h4"
                textAlign="center"
                padding={2}
                fontWeight={600}>
                login
              </Typography>
              <CustomizedInput type="email" label="Email" name="email" />
              <CustomizedInput
                type="password"
                label="Password"
                name="password"
              />
              <Button
                type="submit"
                sx={{
                  px: 2,
                  py: 1,
                  mt: 2,
                  width: "400px",
                  borderRadius: 2,
                  bgcolor: "#00fffc",
                  color: "white",
                  ":hover": {
                    bgcolor: "white",
                    color: "black"
                  }
                }}>
                LOGIN
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default Login;
