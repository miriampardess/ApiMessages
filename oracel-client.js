//const oracledb = require('oracledb');
import oracledb from 'oracledb';

function OracledbClient(){
    try {
        oracledb.initOracleClient({ libDir: 'C:\lib\instantclient_21_3' }); 
    } catch (err) {
        console.error('Whoops!');
        console.error(err);
        process.exit(1);
    }
}

// module.exports = {
//     OracledbClient
// }
export default {OracledbClient};


