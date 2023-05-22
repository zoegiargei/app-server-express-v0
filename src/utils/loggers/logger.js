/* import winston from "winston";
import config from "../../../config.js";

let transports
if(config.NODE_ENV === 'dev'){
    transports = [
        new winston.transport.Console({
            level: "debug"
        }),
        new winston.transport.File({
            level: "warn",
            filename: "error.log"
        })
    ]
} else if(config.NODE_ENV === 'test'){

} else if(config.NODE_ENV === 'prod'){

};

const winstonLogger = winston.createLogger({ transports });
export default winstonLogger; */