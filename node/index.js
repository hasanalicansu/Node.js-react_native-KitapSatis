const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("./src/config/db");
const userRouter = require("./src/routers/userRouter");
const productRouter = require("./src/routers/productRouter");
const favoriteRouter = require("./src/routers/favoriteRouter");


//template engine ayarları
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
app.use(expressLayouts);
app.use(express.static('public'));
app.use("/uploads", express.static(path.join(__dirname,'/src/uploads')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));


//formdan gelen değerlerin okunabilmesi için
app.use(express.urlencoded({ extended: true }));


//--------------
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/favorite", favoriteRouter);

const server = require('http').Server(app)


server.listen(process.env.PORT, () => {
  console.log("BAŞLADIK HAYIRLISIYLA PORT:", process.env.PORT);
});



const io = require('socket.io')(server);
const MessageRoom = require("./src/models/messageRoomModel");
const {
  getMessageProductDetail,
} = require("./src/functions/ForSocketFunction");



io.on("connection", (socket) => {
  console.log(socket.id, "socket başladı");

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
