const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("./src/config/db");
const userRouter = require("./src/routers/userRouter");
const productRouter = require("./src/routers/productRouter");
const favoriteRouter = require("./src/routers/favoriteRouter");

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/favorite", favoriteRouter);

app.listen(process.env.PORT, () => {
  console.log("BAŞLADIK HAYIRLISIYLA PORT:", process.env.PORT);
});

const io = require("socket.io")(80);
const MessageRoom = require("./src/models/messageRoomModel");
const {
  getMessageProductDetail,
} = require("./src/functions/ForSocketFunction");



io.on("connection", (socket) => {
  console.log(socket.id, "hiiii");

  socket.on("NewMessageRoom", async (data) => {
   
    const result = await MessageRoom.findOne({}, {}).and([
      { productId: data.productId },
      { recipient: data.userId },
    ]);
    if (result) {
     
      io.to(socket.id).emit("SendRoomId", { data: result });
    } else {
      const newRoom = await new MessageRoom({
        seller: data.productOwner,
        recipient: data.userId,
        productId: data.productId,
      });
      const result = await newRoom.save();
     
      io.to(socket.id).emit("SendRoomId", { data: result });
      const result2 = await MessageRoom.find({}, {}).or([
        { seller: data.userId },
        { recipient: data.userId },
      ]);
      io.to(socket.id).emit("SendMessageRoom", { data: result2 });
    }
  });

  socket.on("GetMessageRoom", async (data) => {
    const result = await MessageRoom.find({}, {}).or([
      { seller: data.userId },
      { recipient: data.userId },
    ]);
   
    io.to(socket.id).emit("SendMessageRoom", { data: result });
  });


  socket.on("GetProductDetail", async (data) => {
   
    const res = await getMessageProductDetail(data.Id);
   
    io.to(socket.id).emit("SendProductDetail", { data: res });
  });


});
