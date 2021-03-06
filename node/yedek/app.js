const dotenv = require("dotenv").config()
const express =require("express")
const mongoose =require("mongoose")

require("./src/config/db")
const userRouter=require("./src/routers/userRouter")
const productRouter=require("./src/routers/productRouter")
const favoriteRouter=require("./src/routers/favoriteRouter")
const app=express()
app.use(express.json())

app.use("/api/users",userRouter)
app.use("/api/product",productRouter)
app.use("/api/favorite",favoriteRouter)


app.listen(process.env.PORT,()=>{
    console.log('BAŞLADIK HAYIRLISIYLA PORT:',process.env.PORT)
})
