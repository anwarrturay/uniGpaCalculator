const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const today = format(new Date(), 'yyyyMMdd\thh:mm:ss')

const LogEvents = async (message, logName)=>{
    const dateTime = `${today}`;
    const metaLog = `${dateTime}\t${uuidv4()}\t${message}\n`;
    console.log(metaLog);

    try{
        // checks if the logs file exists.
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
    //    creating the logs folder and creating a specific filename in the folder.
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', `${logName}`), metaLog);
    }catch(err){
        console.error(err.message);
    }
}

const logger = (req,res,next)=>{
    LogEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = { logger, LogEvents };