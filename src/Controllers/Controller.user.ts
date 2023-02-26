import { Request, Response, Errback } from "express";
import {  Logger } from "winston";
import { ConfigutationOptions } from "../config/config";
import { IServices } from "../Services/Services.user.types";
import { IController } from "./Controller.user.types";
import { UserDTO } from "./DTO/User.Dto";


export class UserController implements IController{
       private readonly config:ConfigutationOptions;
       private readonly logger:Logger;
       private readonly userService:IServices;
       private readonly userDTO:UserDTO;
       constructor(config:ConfigutationOptions, logger:Logger, userService:IServices, userDTO:UserDTO) {
           this.config = config;
           this.logger = logger;
           this.userService = userService;
           this.userDTO = userDTO;
           this.logger.info("Controller has been initialized.");
       }
       public async signIn(request:Request, response:Response){
               try{
                    const errors = await this.userDTO.CreateUserDTO(request);
                    if (!errors.isEmpty()) {
                         const [error] = errors.array();
                         return response.status(400).json({
                               status:false,
                               message: error.msg
                         })
                     }
                     const newUser = await this.userService.create(request);
                     response.status(201).json(newUser);
                     this.logger.info("Send response to user");
               }catch(error:any) {
                    response.status(400).json({
                         error: error.message
                    });
               }
      }

      public async getUser(request:Request, response:Response){
             try {
               const errors = await this.userDTO.GetUser(request);
               if (!errors.isEmpty()) {
                    const [error] = errors.array();
                    return response.status(400).json({
                          status:false,
                          message: error.msg
                    });
                }
                const {email} = request.params;
                return this.userService.getUser(email)
             } catch (error:any) {
                 response.status(400).json({
                     error: error.message
                 })
             }
      }
     
}