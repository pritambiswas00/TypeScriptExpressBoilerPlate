import { ConfigutationOptions } from "../config/config";
import { Request} from "express";
import { Logger } from "winston";
import UserSchema,{ IUser } from "../Models/User/User.model";
import { IServices } from "./Services.user.types";


export class UserService implements IServices {
     private readonly config:ConfigutationOptions;
     private readonly logger:Logger;
     private readonly userRepo:typeof UserSchema;
     constructor(config:ConfigutationOptions, logger:Logger){
         this.config = config;
         this.logger = logger;
         this.userRepo = UserSchema;
         this.logger.info("Service has been initialized.");

     }
     public async create(req:Request):Promise<IUser>{
             try{
                const newUser = await this.userRepo.create(req.body);
                await newUser.save();
                return newUser;
             }catch(error){
                throw error;
             }
     }

     public async getUser(email:string):Promise<IUser[]>{
           try{ 
              const users = await this.userRepo.find({
                  email: email
              });
              return users;
           }catch(error){
               throw error;
           }
     }
}