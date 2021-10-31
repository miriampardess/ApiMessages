const dbconfig = require("./dbconfig");
const express = require("express");
const oracelClient = require("./oracel-client");
const messageController = require("./controllers/message-controller");
const logger = require('./log/logger');

const server = express();

oracel();

async function oracel() {
  try {
    const oracelDb = oracelClient.OracledbClient;
    if (!oracelDb) {
      logger.error("oracelDb Not Found");

    } else {
      serverAp();
    }
  }
  catch (err) {
    logger.error(err);

  }
}

async function serverAp() {
  server.use(express.json());
  server.use("/api/messages", messageController);

  server.use("*", (req, res) => {
    logger.error("Rout Not Found");
    res.status(404).send("Rout Not Found");
  });
}

server.listen(1522, () => console.log("Listening on http://loclhost:1522"));
