import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import mongoose from "mongoose";

import viewsRouter from "./routes/views.router.js"
import productsRouter from "./routes/api/products.router.js"
import cartsRouter from "./routes/api/carts.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set ("view engine", "handlebars");
app.set ("views", path.join(__dirname, "views"));

app.use ("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


const httpServer = createServer(app);
const io = new Server(httpServer);

app.set("io", io);

io.on("connection", (Socket) => {
    console.log ("Socket conectado:", Socket.id);

    Socket.on("disconnect", () => {
        console.log("Socket desconectado:", Socket.id)
    });
});

mongoose.connect("mongodb+srv://coder:guardala@cluster0.v1ra18b.mongodb.net/entrega2?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Error MongoDB:", err));



const PORT = 8080;
httpServer.listen(PORT, ()=> {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
























