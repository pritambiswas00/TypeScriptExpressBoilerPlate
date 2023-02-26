import { Request, Response } from "express";

export interface  IServices {
    create(req:Request):void;

    getUser(email:string):void;
}