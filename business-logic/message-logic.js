
import { dal } from "../data-access-layer/dal.js";
import moment from "moment";
import logger from '../logger.js';

//Get All MessagesAsync 
export async function getAllMessagesAsync(message) {
  try {
    let sql = `SELECT KEY,FROM_NAME,TO_NAME,MESSAGE FROM MESSAGES`
    let bindParams = {};

    if (message.from_name || message.to_name || message.created_at) {
      sql += ' WHERE';
      let filter = false;

      if (message.from_name !== undefined) {
        filter = true;
        bindParams.from_name = message.from_name;
        sql += ` FROM_NAME = :from_name`

      }
      if (message.to_name !== undefined) {
        if (filter) { sql += ' AND'; }
        bindParams.to_name = message.to_name;
        sql += ` TO_NAME = :to_name`
      }
      if (message.created_at !== undefined) {
        if (filter) { sql += ' AND'; }
        bindParams.created_at = message.created_at;
        sql += ` created_at = :created_at`

      }
    }

    let messages = await dal(sql, bindParams, null);

    return messages;
  }
  catch (err) {

    throw new Error(err);

  }

}
//Get One MessageAsync

export const getOneMessageAsync = async (key) => {
  try {
    let bindParams = { key: key };
    const sql = `SELECT KEY,FROM_NAME,TO_NAME,MESSAGE FROM messages WHERE KEY = :key`;
    let messages = await dal(sql, bindParams, null);
    return messages;
  }
  catch (err) {
    throw new Error(err);
  }

}

//Add One MessagesAsync
export async function addOneMessageAsync(message) {

  try {
    const addKey = makeid(4);
    let createdAt, updatedAt;
    createdAt = updatedAt = moment().format("DD-MMMM-YYYY hh:mm:ss.mmmmmmmm");

    let bindParams = { Key: addKey, from_name: message.from_name, to_name: message.to_name, message: message.message, created_at: createdAt, updated_at: updatedAt }
    const sql = 'INSERT INTO MESSAGES(KEY,FROM_NAME,TO_NAME,MESSAGE,CREATED_AT,UPDATED_AT)VALUES(:Key, :from_Name, :to_name, :message, :created_at, :updated_at)';
    let info = await dal(sql, bindParams, "post");
    return addKey;
  }
  catch (err) {
    throw new Error(err);
  }
}

//Delete MessageAsync
export async function deleteMessageAsync(key) {

  try {
    let bindParams = { key: key };
    const sql = `delete from messages where KEY = :key`;
    let messages = await dal(sql, bindParams, "delete");
    return messages;
  }
  catch (err) {
    throw new Error(err);

  }
}

//Put One MessageAsync

export async function putOneMessageAsync(message) {
  try {
    let bindParams = { Key: message.Key, from_name: message.from_name, to_name: message.to_name, message: message.message }
    let sql = `Update MESSAGES SET FROM_NAME = :from_name,TO_NAME = :to_name,MESSAGE= :message WHERE Key =:Key`

    let messages = await dal(sql, bindParams, null);
    return messages;
  }
  catch (err) {
    throw new Error(err);
  }

}

//Create the key automatically
function makeid(length) {
  var key = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return key;
}

