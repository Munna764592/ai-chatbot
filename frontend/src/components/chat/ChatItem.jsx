import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import logo from "../images/logoai.jpg";
import { useAuth } from "../../contexts/AuthContext";

function ChatItem({ content, role }) {
  const { user } = useAuth();
  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", gap: 2 }}>
      <Avatar sx={{ ml: "0" }}>
        {/* <img src={logo} alt="openai" width={"30px"} /> */}AI
      </Avatar>
      <Box>
        <Typography color={"white"} fontSize={"15px"}>
          {content}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
      <Avatar sx={{ ml: "0" }}>{user?.name[0]}</Avatar>
      <Box>
        <Typography color={"white"} fontSize={"15px"}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
}

export default ChatItem;
