import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { server } from "socket.io";
import { engine } from "express-handlebars";

import viewsRouter from "./routes/views.router.js"
import productsRouter from "./routes/api/products.router.js"
import cartsRouter from "./routes/api/carts.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/api/products", productsRouter);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__filename, "public")));

app.engine("handlebars", engine());
app.set ("view engine", "handlebars");
app.set ("views", path.join(__dirname, "views"));

const httpServer = createServer(app);
const io = new Server(httpServer);

app.set("io", io);

io.on("connection", (Socket) => {
    console.log ("Socket conectado:", Socket.id);
    Socket.on("disconnect", () => {
        console.log("Socket desconectado:", Socket.id)
    });
});

app.use ("/", viewsRouter);
app.use ("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const PORT = 8080;
httpServer.listen(PORT, ()=> {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
























