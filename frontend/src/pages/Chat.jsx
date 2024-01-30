import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import {useNavigate} from 'react-router-dom'
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest
} from "../helpers/api-communicatons";
import toast from "react-hot-toast";

function Chat() {
  const navigate = useNavigate()
  const inputRef = useRef(null);
  const { user, isLoggedIn } = useAuth();

  const [chatMessages, setChatMessages] = useState([]);
  const handleSubmit = async (e) => {
    const content = inputRef.current?.value;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats", { id: "deletechats" });
    } catch (err) {
      console.log(err);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };
  useLayoutEffect(() => {
    if (isLoggedIn && user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading failed", { id: "loadchats" });
        });
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if(!isLoggedIn){
     return navigate("/login")
    }
  }, [isLoggedIn]);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          width: "100%",
          height: "100%",
          mt: 3,
          gap: 3
        }}>
        <Box
          sx={{
            display: { md: "flex", xs: "none", sm: "none" },
            flex: 0.2,
            flexDirection: "column"
          }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "70vh",
              bgcolor: "rgb(17,29,39)",
              borderRadius: 5,
              flexDirection: "column",
              mx: 3
            }}>
            <Avatar
              sx={{
                mx: "auto",
                my: 2,
                bgcolor: "white",
                color: "black",
                fontWeight: 700
              }}>
              {user?.name[0]}
            </Avatar>
            <Typography sx={{ mx: "auto" }}>
              you are talking to a chatBOT
            </Typography>
            <Typography sx={{ mx: "auto", my: 4, p: 2, fontSize: "15px" }}>
              you can ask some questions related to knowledge, Business,
              Advices, Education, etc. But avoid sharing personal information.
            </Typography>
            <Button
              onClick={handleDeleteChats}
              sx={{
                width: "200px",
                my: "auto",
                color: "white",
                fontWeight: "700",
                borderRadius: 2,
                mx: "auto",
                bgcolor: "red",
                ":hover": {
                  bgcolor: "#FF6868"
                }
              }}>
              Clear Conversation
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: { md: 0.8, xs: 1, sm: 1 },
            flexDirection: "column",
            margin: "0 20px"
          }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "30px",
              color: "white",
              mb: 2,
              mx: "auto"
            }}>
            Model - GPT3.5 Turbo
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              overflowY: "auto"
            }}>
            {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))}
          </Box>
          <div
            style={{
              width: "96%",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "rgb(17,27,39)",
              display: "flex",
              margin: "20px 0"
            }}>
            <input
              ref={inputRef}
              type="text"
              style={{
                width: "100%",
                background: "transparent",
                padding: "5px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "15px"
              }}
            />
            <IconButton
              onClick={handleSubmit}
              sx={{ ml: "auto", color: "white" }}>
              <i
                style={{ fontSize: "18px" }}
                className="fa-regular fa-paper-plane"></i>
            </IconButton>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Chat;
