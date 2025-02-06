const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next)=>{
    const origin = req.headers.origin; // getting the origin from the headers.
    if(allowedOrigins.includes(origin)){
        res.header("Access-Control-Allow-Credentials", true); // setting the authorization headers with access-control-allow-credentials to true.
    }
    next();
}

module.exports = credentials;