const express = require('express');
const app = express();
const taskRoute = require("./routes/tasks.js");
const connectDB = require('./db/connect.js');
require("dotenv").config();
app.use(express.json())
app.use(express.static("./public"))
const PORT = 3000;

//ルーティング設計
app.use("/api/v1/tasks", taskRoute)
//DB接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(process.env.PORT || PORT, console.log('サーバーが起動しました'));
  } catch (err){
    console.log(err)
  }
}
start();