
var express = require('express');
var oracledb = require('oracledb');
var app = express();
const dbconfig = require("../dbconfig.js");
// Get a non-pooled connection
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
const Message = require("../models/message");
const logger = require("../log/logger");

var Succeeded = false;

const executeAsync = async (sql, res) => {
    let error;
    //let user;

    oracledb.getConnection(
        {
            user: dbconfig.user,
            password: dbconfig.password,
            connectString: dbconfig.connectString
        },

        async function (err, connection) {
            if (err) {
                error = err;
                console.log("Error connecting database ... " + error);
                logger.error("Error connecting database ... " + error);

                return;
            }
            console.log("Database is connected ... ");
            logger.info("Database is connected ... ");

            let list = await connection.execute(sql, [], { autoCommit: true }, async function (err, result) {
                if (err) {
                    error = err;
                    return;
                }

                error = null;

                connection.close(async function (err) {
                    if (err) { console.log(err); }

                });
                if (result.rows) {
                    list = result.rows;
                    if (result.rows.length !== 0) {
                        return res(list);
                    } else {
                        Succeeded = false;
                        return res(Succeeded);
                    }
                } else {
                    Succeeded = true;
                    return res(Succeeded);
                }
            })
        }
    );
}

module.exports = executeAsync;