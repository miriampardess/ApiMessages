//Brings and returns information from data bites
const express = require("express");
const { date } = require("joi");
const messageslogic = require("../business-logic/message-logic");
const Message = require("../models/message");
const router = express.Router();

//Get all Message & GET with the ability to filter
router.get("/", async (req, res, next) => {
    try {
        const from_name = req.query.from_name;
        const to_name = req.query.to_name;
        const createdat = req.query.created_at;

        let messages = await messageslogic.getAllMessagesAsync(from_name, to_name, createdat);

        if (messages) {
            res.status(200).send(messages);
        } else {
            res.sendStatus(404);
            return;
        }
    }
    catch (err) {
        res.status(500).send("failure...");
    }
});

//Get one Message
router.get("/:key", async (req, res) => {
    const key = req.params.key

    try {
        let foundMessage = await messageslogic.getOneMessageAsync(key);
        if (foundMessage) {
            res.status(200).send(foundMessage);
        } else {
            res.sendStatus(404);
            return;
        }
    }
    catch (err) {
        res.status(500).send("failure...");
    }

});

//Add new Message
router.post("/", async (req, res) => {
    try {

        let message = new Message(undefined, req.body.key, req.body.from_name, req.body.to_name, req.body.message, req.body.created_at, req.body.updated_at);

        let addMessage = await messageslogic.addOneMessageAsync(message);
        if (addMessage) {
            res.status(201).send(addMessage);
        } else {
            res.sendStatus(404);
            return;
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

//Delet Message 
router.delete("/:key", async (req, res) => {
    try {
        const key = req.params.key;
        let de = await messageslogic.deleteMessageAsync(key);
        if (de) {
            res.status(200).send(de);
        } else {
            res.sendStatus(404);
            return;
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;