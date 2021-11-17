import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { router } from "./controllers/message-controller.js";
import logger from './logger.js';
const server = express();

serverAp();

async function serverAp() {
  server.use(express.json());
  logger.logger.info('The server starts working ..')
  server.use("/api/messages", router);

  server.use("*", (req, res) => {
   logger.logger.error("Route Not Found");
    res.status(404).json({
      status: 'Route Not Found',
    });
  });
}
let port = process.env.port ;
server.listen(port, () => console.log(`Listening on http://loclhost: ${port}`));
