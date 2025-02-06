const allowedOrigins = require("./allowedOrigins");
const corsOptions = {
    origin: (origin, callback)=>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 204 // this option is set as a result of the older version browsers like the Internet explorer because they can only understand status codes. But if you're only building for specific browsers it's not actually necessary to indicate it during development.
}

module.exports = corsOptions;