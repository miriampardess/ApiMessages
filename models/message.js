//Describes a class that is a single message

import Joi from 'joi';
// import * as express from 'express'
// import { SHUTDOWN_MODE_IMMEDIATE } from 'oracledb';
import pkg from 'express';
const { Request, Response, NextFunction } = pkg;
import pkg2 from '@hapi/joi';
const { SchemaLike } = pkg2;
export class Message {

    constructor(id, Key, from_name, to_name, message, created_at, updated_at) {
        this.id = id;
        this.Key = Key;
        this.from_name = from_name;
        this.to_name = to_name;
        this.message = message;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    validatePost() {
            const result = postValidationSchema.validate(this, { abortEarly: false });
            return result.error ? result.error.details.map(err => err.message) : null;
    }
    validateGet() {
        const result = getValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.details.map(err => err.message) : null;
}
}
const postValidationSchema = Joi.object({
    id: Joi.number(),
    Key: Joi.number(),
    from_name: Joi.string().required().min(1).max(200),
    to_name: Joi.string().required().min(1).max(200),
    message: Joi.string().required(),
    created_at: Joi.number(),
    updated_at: Joi.number()
})
const getValidationSchema = Joi.object({
    id: Joi.number(),
    Key: Joi.number(),
    from_name: Joi.string().min(1).max(200),
    to_name: Joi.string().min(1).max(200),
    message: Joi.string(),
    created_at: Joi.number(),
    updated_at: Joi.number()
})


