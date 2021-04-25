import express from "express";
import "./database";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { routes } from "./routes";
import path from "path";


const app = express();

app.use(express.static(path.join(__dirname, "..", "public")))
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view_engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
})


const http = createServer(app); //criando protocolo http
const io = new Server(http); // criando protocolo WS com base no http

io.on("connection", (socket: Socket) => {
    //console.log("Se conectou.", socket.id);
});

app.use(express.json());
app.use(routes);

export { http, io };