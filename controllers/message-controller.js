//Brings and returns information from data bites
import express from "express";
//import { date } from "joi";
import { getAllMessagesAsync, getOneMessageAsync, addOneMessageAsync, deleteMessageAsync } from "../business-logic/message-logic.js";
import { Message } from "../models/message.js";
//const router = express.Router();
import { Router as expressRouter } from 'express';
export const router = expressRouter();
import logger from '../logger.js';
import * as Joi from 'joi'

//Get all Message & GET with the ability to filter
router.get("/", async (req, res) => {

    let message = new Message(undefined, undefined, req.query.from_name, req.query.to_name, undefined, req.query.created_at, undefined);
    const errorr = message.validateGet();
    if (errorr) {
        logger.logger.error(errorr)

        res.status(400).json({
            status: 'faild',
            payload: errorr.message
        });
        return;
    }
    try {
        let messages = await getAllMessagesAsync(message);
     
        logger.logger.info('The Get was successful')

        res.status(200).json({
            status: 'ok',
            payload: messages.rows
        });
    }
    catch (err) {
        logger.logger.error(err)
        res.status(500).json({
            status: 'faild',
            payload: err.message
        });
    }
});

//Get one Message
router.get("/:key", async (req, res) => {
    const key = req.params.key
    try {
        let foundMessage = await getOneMessageAsync(key);
        logger.logger.info('The Get was successful')

        res.status(200).json({
            status: 'ok',
            payload: foundMessage
        });
    }
    catch (err) {
        logger.logger.error(err)

        res.status(500).json({
            status: 'faild',
            payload:foundMessage
        });

    }
});

//Add new Message
router.post("/", async (req, res) => {

    try {
        let message = new Message(undefined, undefined, req.body.from_name, req.body.to_name, req.body.message, undefined, undefined);
        const errorr = message.validatePost();
        if (errorr) {
            logger.logger.error(errorr)
            res.status(400).json({
                status: 'faild',
                payload: errorr.message
            });
            return;
        }
       try {
            let addMessage = await addOneMessageAsync(message);
            logger.logger.info('The Pose was successful')

            res.status(200).json({
                status: 'ok'
            });
        } catch (err) {
            logger.logger.error(err);
            res.status(500).json({
                status: 'faild',
                payload: err.message
            });
        }

    }
    catch (err) {
        logger.logger.error(err);
        res.status(500).json({
            status: 'faild',
            payload: err.message
        });
    }
});

//Delet Message 
router.delete("/:key", async (req, res) => {
    const key = req.params.key;
    try {
        let de = await deleteMessageAsync(key);
        logger.logger.info('The Delete was successful')
        res.status(200).json({
            status: 'ok'
        });
    }
    catch (err) {
        logger.logger.error(err);
        res.status(500).json({
            status: 'faild',
            payload: err.message
        });
    }
});



