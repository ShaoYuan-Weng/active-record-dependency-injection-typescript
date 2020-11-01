import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";

dotenv.config();

import { DatabaseRouter } from "./routers/databases";
import { SchemeRouter } from "./routers/schema";
import { container } from "./container/container";

const app = express();
const port = 3000;

app.use(express.json());

app.use('/databases', new DatabaseRouter().setUp());
app.use('/schema', new SchemeRouter().setUp());

container.injectAll();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
