import { Express, NextFunction, Request, Response } from "express";
import { Logger } from "winston";
import { ConfigutationOptions } from "../config/config";
import { UserController } from "../Controllers/Controller.user";
import { IController } from "../Controllers/Controller.user.types";
import { UserDTO } from "../Controllers/DTO/User.Dto";
import { IUser } from "../Models/User/User.model";

export class UserModule{
      private appModule:Express;
      private config:ConfigutationOptions;
      private prefix:string;
      private logger:Logger;
      private controller :IController;
    constructor(appModule:Express, config:ConfigutationOptions, prefix:string, logger:Logger, userController:IController){
          this.appModule = appModule;
          this.config = config;
          this.prefix=prefix;
          this.logger = logger;
          this.controller=userController;
          
    }

    public initApis(){
       this.logger.info("User Module Initialized.");
       this.appModule.post(this.prefix+"/signIn",(req:Request, res:Response)=>this.controller.signIn(req, res));
       this.appModule.get(this.prefix+"/:email", (req:Request, res:Response, next:NextFunction)=>this.middleware(req, res, next),(req:Request, res:Response)=>this.controller.getUser(req, res));
    }

    private middleware(req:Request, res:Response, next:NextFunction){
       next();
    }
}