
import { MongoClient, MongoError } from "mongodb";
import { Logger } from "winston";
import { ConfigutationOptions } from "../../config/config";


export class DataBase{
    private static instance : DataBase;
    private readonly config : ConfigutationOptions;
    private readonly logger:Logger
    private constructor(config:ConfigutationOptions, logger:Logger) {
        this.config = config;
        this.logger = logger;
    }

    public static getDataBaseInstance (config:ConfigutationOptions, logger:Logger):DataBase{
          if(!DataBase.instance){
               DataBase.instance = new DataBase(config, logger);
          }
          return DataBase.instance;
    }

    public connectDatabase() {
      try{
          let authString:string = "";
          if (this.config.DBUsername != "") {
              authString = encodeURIComponent(!this.config.DBUsername) + ":" + encodeURIComponent(!this.config.DBPassword) + "@"
          }
          const url = "mongodb://" + authString + this.config.IPAddress + ":27017/" + this.config.DBName;
          console.log(url)
          //Connection Establishment
          MongoClient.connect(url).catch((error:MongoError)=>{
               this.logger.error(error.message);
               process.exit(1);
          });
          
          // self.db = self.client.db(self.config.mongoDBName);
          this.logger.info("Connected to the Database.");
          return true;
      }catch(error:any){
          this.logger.error("Error connecting to the Database."+error);
          throw new Error(error);
      }
  };
    
}


