import express from "express";
import productRouter from "./routers/product.js";

const app = express();
const HOST = "127.0.0.1"
const PORT =  3000;

app.use(express.json());

app.use("/products", productRouter);

app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`)
})