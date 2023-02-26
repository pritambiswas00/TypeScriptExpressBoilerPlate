import { Request } from "express";
import { body, query, param, validationResult } from "express-validator";



export class UserDTO {
    constructor(){}
    async CreateUserDTO(req:Request){
         await body("name", "Please provide a valid name").notEmpty().isString().run(req);
         await body("email", "Please provide a valid email").notEmpty().isString().isEmail().run(req);
         await body("password", "Please provide a valid password").notEmpty().isString().isAlphanumeric().run(req);
         return validationResult(req);
    }

    async GetUser(req:Request){
        await param("email", "Please provide a valid userid").notEmpty().isString().isEmail().run(req);
        return validationResult(req);
    }
}