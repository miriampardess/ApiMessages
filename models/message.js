//Describes a class that is a single message

const Joi = require('joi');

class Message {
    constructor(id,Key, from_name, to_name, message, created_at,updated_at) {
        this.id = id;
        this.Key = Key;
        this.from_name = from_name;
        this.to_name = to_name;
        this.message = message;
        this.created_at =  created_at;
        this.updated_at = updated_at;
    }

}

module.exports = Message;
