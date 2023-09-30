import { createLogger,transports,format } from "winston";

const Logger = createLogger({
    transports:[
        new transports.File({
            filename:"server-info.log",
            level:"info",
            format:format.combine(format.timestamp(), format.json())
        })
    ]
})

export default Loggerr