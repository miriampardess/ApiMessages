//Logic of information
const { date } = require("joi");
const dal = require("../data-access-layer/dal");
const moment = require("moment");

// Get All MessagesAsync 
async function getAllMessagesAsync(from_name, to_name, createdat) {

  return new Promise(function (resolve, reject) {

    let sql = `SELECT * FROM messages WHERE `

    if (from_name || to_name || createdat) {

      if (from_name !== undefined) {
        sql += `from_name= '${from_name}' AND `
      }
      if (to_name !== undefined) {
        sql += `to_name= '${to_name}' AND `
      }
      if (createdat !== undefined) {
        sql += `created_at= '${createdat}' AND `
      }
      sql = sql.substr(0, sql.length - 4);
    }
    else {
      // Sort in ascending order
      sql = sql.substr(0, sql.length - 7);
      sql += ` order by id`
    }

    var messages;

    dal(sql, (res, rej) => {
      messages = res;

      if (messages) {
        return resolve(messages);

      } return reject("err");

    });

  })
}
//Get One MessageAsync
async function getOneMessageAsync(key) {

  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM messages WHERE key = '${key}'`;

    var messages;
    dal(sql, (res, rej) => {

      messages = res;


      if (messages) {
        return resolve(messages);

      } return reject("err");
    });

  })
}
//Add One MessagesAsync
async function addOneMessageAsync(message) {
  return new Promise(function (resolve, reject) {

    const addKey = makeid(4);

    let createdAt = moment().format("DD-MMMM-YYYY hh:mm:ss.mmmmmmmm");
    let updatedAt = moment().format("DD-MMMM-YYYY hh:mm:ss.mmmmmmmm");


    const sql = `INSERT INTO messages (key,from_Name,to_name,message,created_at,Updated_at) VALUES('${addKey}','${message.from_name}','${message.to_name}','${message.message}','${createdAt}','${updatedAt}')`;

    var info;
    dal(sql, (res, rej) => {
      info = res;

      if (info) {
        return resolve(info);

      } return reject("err");
    });

  })
}

//Delete MessageAsync
async function deleteMessageAsync(key) {
  return new Promise(function (resolve, reject) {

    const sql = `delete from messages where key= '${key}'`;

    var messages;

    dal(sql, (res, rej) => {
      messages = res;

      if (messages) {
        return resolve(messages);

      } return reject("err");

    });
  })
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

//exports
module.exports = {
  getAllMessagesAsync,
  getOneMessageAsync,
  addOneMessageAsync,
  deleteMessageAsync
};

