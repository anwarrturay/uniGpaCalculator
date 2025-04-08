const { LogEvents } = require('./logger');
const errorHandler = (err, req, res, next)=>{
    LogEvents(`${err.name}:${err.message}`, 'errLog.txt');
    console.error(err.stack);
    res.status(500).send(err.message)
}

module.exports = errorHandler;