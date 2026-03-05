const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Раздаём статические файлы из папки frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Главная страница
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Socket.IO события
io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    socket.on("playerMove", (data) => {
        socket.broadcast.emit("updatePlayer", { id: socket.id, position: data });
    });

    socket.on("playerShoot", (data) => {
        socket.broadcast.emit("playerHit", { id: socket.id, targetId: data.targetId, damage: data.damage });
    });

    socket.on("disconnect", () => {
        console.log("Player disconnected:", socket.id);
        socket.broadcast.emit("playerDisconnected", { id: socket.id });
    });
});

// ✅ Объявляем PORT ТОЛЬКО ОДИН РАЗ
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
