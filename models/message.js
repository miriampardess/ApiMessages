//Describes a class that is a single message

import Joi from 'joi';
// import * as express from 'express'
// import { SHUTDOWN_MODE_IMMEDIATE } from 'oracledb';
import pkg from 'express';
const { Request, Response, NextFunction } = pkg;
import pkg2 from '@hapi/joi';
const { SchemaLike } = pkg2;
export class Message {
    constructor(object) {
        this.id = object.id;
        this.Key = object.key;
        this.from_name = object.from_name;
        this.to_name = object.to_name;
        this.message = object.message;
        this.created_at = object.created_at;
        this.updated_at = object.updated_at;
    }

    validatePost() {
        const result = postValidationSchema.validate(this, { abortEarly: true });
        // throw new error(result.error ? result.error.details.map(err => err.message) : null);
        //  return result.error ? result.error.details.map(err => err.message) : null;
        return result.error ? result.error.message : null;

    }
    validateGet() {
        const result = getValidationSchema.validate(this, { abortEarly: true });
        // throw new error(result.error ? result.error.details.map(err => err.message) : null);
        // return result.error ? result.error.details.map(err => err.message) : null;
        return result.error ? result.error.message : null;

    }
    validatePut() {
        const result = putValidationSchema.validate(this, { abortEarly: true });
        return result.error ? result.error.message : null;

    }
}
const putValidationSchema = Joi.object({
    id: Joi.number(),
    Key:Joi.required(),
    from_name: Joi.string().required().min(1).max(200),
    to_name: Joi.string().required().min(1).max(200),
    message: Joi.string().required(),
    created_at: Joi.number(),
    updated_at: Joi.number()
})

const postValidationSchema = Joi.object({
    id: Joi.number(),
    Key: Joi.string(),
    from_name: Joi.string().required().min(1).max(200),
    to_name: Joi.string().required().min(1).max(200),
    message: Joi.string().required(),
    created_at: Joi.number(),
    updated_at: Joi.number()
})
const getValidationSchema = Joi.object({
    id: Joi.number(),
    Key: Joi.number().required(),
    from_name: Joi.string().min(1).max(200).required(),
    to_name: Joi.string().min(1).max(200).required(),
    message: Joi.string().required(),
    created_at: Joi.number(),
    updated_at: Joi.number()
})


