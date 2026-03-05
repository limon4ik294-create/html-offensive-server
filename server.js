const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.send("HTML Offensive server is running 🔥");
});

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
