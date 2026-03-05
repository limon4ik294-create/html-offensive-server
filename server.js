const express = require("express");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);

// Раздаём статические файлы из frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Главная страница
app.get("/", (req, res) => {
    res.send("HTML Offensive server is running 🔥");
});

const PORT = process.env.PORT || 3000; // Render даст свой порт через process.env.PORT
server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
