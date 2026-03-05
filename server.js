const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Раздаём статические файлы
app.use(express.static(path.join(__dirname, "frontend")));

// Главная страница
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// События Socket.IO
io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    // Пример: игрок отправляет координаты
    socket.on("playerMove", (data) => {
        console.log(`Player ${socket.id} moved:`, data);

        // Отправляем всем остальным игрокам
        socket.broadcast.emit("updatePlayer", {
            id: socket.id,
            position: data
        });
    });

    // Пример: игрок наносит урон
    socket.on("playerShoot", (data) => {
        console.log(`Player ${socket.id} shot:`, data);

        // Можно отправлять другим игрокам
        socket.broadcast.emit("playerHit", {
            id: socket.id,
            targetId: data.targetId,
            damage: data.damage
        });
    });

    socket.on("disconnect", () => {
        console.log("Player disconnected:", socket.id);
        socket.broadcast.emit("playerDisconnected", { id: socket.id });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
