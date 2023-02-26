
import { createLogger, format, transports, LoggerOptions, Logger } from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, printf } = format;

export const logger = (serviceName:string)=>{
  const logger: Logger = createLogger({
    transports:[new transports.Console()],
    format:format.combine(
       format.colorize(),
       format.timestamp(),
       format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
    defaultMeta: serviceName
   })
    return logger;
}
