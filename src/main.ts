import path from "path";
import { configuration, ConfigutationOptions } from "./config/config";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from 'morgan';
import http from "http";
import session from "express-session";
import { logger } from "./log";
import { UserModule } from "./Modules/Module.user";
import {DataBase} from "./common/DB/DataBase"
import { UserController } from "./Controllers/Controller.user";
import { UserService } from "./Services/Services.user";
import { UserDTO } from "./Controllers/DTO/User.Dto";
import { Logger } from "winston";



const app = express();
const config = configuration();
const log:Logger = logger("Application");
const database = DataBase.getDataBaseInstance(config, log);

async function bootStrap(appModule: Express, config: ConfigutationOptions, database:DataBase, log:Logger) {
    try {
        let server
        appModule.use(express.json({ limit: "50mb" }));
        appModule.use(cors());
        appModule.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
        appModule.use(express.urlencoded({ extended: false }));
        appModule.use(function (req: Request, res: Response, next: NextFunction) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            next();
        });
        appModule.use(session({
            secret: "abcde",
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: 60*60*1000 }
        }));
        database.connectDatabase();
        let instances = [
            new UserModule(appModule, config, "/api/user", log, 
            new UserController(config, log, 
            new UserService(config, log), new UserDTO)),

        ]
        for(let instance of instances) {
             instance.initApis();
        }
        server = http.createServer(appModule);
        server.listen(config.PORT, () => {
            log.info("Server is up on port " + config.PORT)
        });
    } catch (error) {
        log.error(error);
        process.exit(1);
    }
}

bootStrap(app, config, database, log);






