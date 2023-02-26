import { Request, Response } from "express";

export interface  IController {
        
    signIn(req:Request, res:Response):void;

    getUser(req:Request, res:Response):void;
}