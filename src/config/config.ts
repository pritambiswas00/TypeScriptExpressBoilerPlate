import * as dotenv from "dotenv";
import * as path from "path";
import Joi from "joi";
dotenv.config({ path: path.resolve(__dirname, `${process.env.ENV}.env`)});
export interface ConfigutationOptions {
      PORT : number;
      isHttps: string|undefined;
      DBUsername:string|undefined,
      DBPassword:string|undefined,
      DBConnection:string|undefined;
      DBName:string|undefined;
      IPAddress:string|undefined;
}
export const configuration = ():ConfigutationOptions=>{
     return {
        PORT : Number(process.env.PORT),
        isHttps:process.env.isHttps,
        DBConnection: process.env.DBConnection,
        DBPassword: process.env.DBPassword,
        DBUsername: process.env.DBUsername,
        DBName: process.env.DBName,
        IPAddress: process.env.IPAddress
     }
}
