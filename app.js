import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import oracelClient from "./oracel-client.js";
import { router } from "./controllers/message-controller.js";


import  logger  from './logger.js';
const server = express();

oracel();

async function oracel() {
  try {
    const oracelDb = oracelClient.OracledbClient;
    if (!oracelDb) {
    logger.logger.error('oracelDb Not Found')


    } else {
      serverAp();

    }
  }
  catch (err) {
    logger.logger.error(err);


  }
}

async function serverAp() {
  server.use(express.json());
  logger.logger.info('The server starts working ..')
  server.use("/api/messages", router);

  server.use("*", (req, res) => {
    logger.logger.error(err)
    res.status(404).json({
      status: 'Rout Not Found',
    });
  });
}


server.listen(1522, () => console.log("Listening on http://loclhost:1522"));
