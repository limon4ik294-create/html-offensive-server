const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io"); // добавляем Socket.IO

const app = express();
const server = http.createServer(app);

// Раздаём статические файлы из frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Главная страница
app.get("/", (req, res) => {
    res.send("HTML Offensive server is running 🔥");
});

// ----------------- Socket.IO -----------------
const io = new Server(server);

// Обработка подключений
io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    // Получаем движение игрока и пересылаем другим
    socket.on("playerMove", (data) => {
        socket.broadcast.emit("updatePlayer", {
            id: socket.id,
            position: data
        });
    });

    // Получаем выстрел и пересылаем другим
    socket.on("playerShoot", (data) => {
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
// ----------------- /Socket.IO -----------------

// Твои рабочие строки оставляем без изменений
const PORT = process.env.PORT || 3000; // Render даст свой порт через process.env.PORT
server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
