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

    let object = req.query;
    let message = new Message(object);
    const errorr = message.validateGet();
    if (errorr) {
        logger.logger.error(errorr)
        //Validation error due to incorrect information provided by the user
        res.status(400).json({
            status: 'Validation error',
            message: errorr
        });
        return;
    }
    try {
        let messages = await getAllMessagesAsync(message);
        logger.logger.info('The command succeeded')

        res.status(201).json({
            status: 'ok',
            message: messages.rows
        });
    }
    catch (err) {
        logger.logger.error(err)
        res.status(500).json({
            status: 'faild',
            message: err.message
        });
    }
});

//Get one Message
router.get("/:key", async (req, res) => {
    const key = req.params.key
    try {
        let foundMessage = await getOneMessageAsync(key);
        logger.logger.info('The command succeeded')
        res.status(200).json({
            status: 'ok',
            message: foundMessage.rows
        });
    }
    catch (err) {
        logger.logger.error(err)

        res.status(500).json({
            status: 'faild',
            message: foundMessage
        });

    }
});

//Add new Message
router.post("/", async (req, res) => {

    try {
        let object = req.body;
        let message = new Message(object);
        const errorr = message.validatePost();
        if (errorr) {
            logger.logger.error(errorr)
            //Validation error due to incorrect information provided by the user
            res.status(400).json({
                status: 'Validation error',
                message: errorr.message
            });
            return;
        }
        try {
            let addMessage = await addOneMessageAsync(message);
            logger.logger.info('The command succeeded')

            res.status(200).json({
                status: 'ok'//,
               // message: 'The command succeeded'

            });
        } catch (err) {
            logger.logger.error(err);
            res.status(500).json({
                status: 'faild',
                message: err.message
            });
        }

    }
    catch (err) {
        logger.logger.error(err);
        res.status(500).json({
            status: 'faild',
            message: err.message
        });
    }
});

//Delet Message 
router.delete("/:key", async (req, res) => {
    const key = req.params.key;
    try {
        let de = await deleteMessageAsync(key);
        logger.logger.info('The command succeeded')
        res.status(200).json({
            status: 'ok'//,
           // message: 'The command succeeded'
        });
    }
    catch (err) {
        logger.logger.error(err);
        res.status(500).json({
            status: 'faild',
            message: err.message
        });
    }
});



