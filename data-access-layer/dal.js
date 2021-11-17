import oracledb from 'oracledb';
import dotenv from 'dotenv';
oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
dotenv.config();
import logger from '../logger.js';

await oracledb.createPool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.CONNECTSTRING,
    poolAlias: 'hrpool'

});

const connection = await oracledb.getConnection('hrpool');

export const dal = async (sql, bindParams, fromPostDelet) => {

    try {
        let result;
        if (fromPostDelet) {
            result = await connection.execute(sql, bindParams, { outFormat: oracledb.OBJECT, autoCommit: true });
        } else {
            result = await connection.execute(sql, bindParams, { outFormat: oracledb.OBJECT });
        }
        return result;

    }
    catch (err) {
        throw new Error(err);
    }
}
