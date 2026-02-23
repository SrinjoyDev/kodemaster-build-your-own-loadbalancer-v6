import Joi from "joi";
import path from "path";
import fs from "fs";


//type for backend server config>>
export interface IBackendServerConfig {
    domain : string;
    weight : number;
}

//type for full applicatio config>
export interface IConfig  {
    lbPORT : number;
    lbAlgo : "rand" | "rr" | "wrr";
    be_servers : IBackendServerConfig[];
}

export class Config {
    //singleton patters config instance>
    private static config : IConfig | undefined;

    //shcema validation>?
    private static schema = Joi.object<IConfig>({
        //tcp port
        lbPORT : Joi.number().port().required(),
        lbAlgo : Joi.string().valid("rand", "rr", "wrr").required(),
        be_servers : Joi.array().items(
            Joi.object<IBackendServerConfig>({
                domain : Joi.string().uri().required(),
                weight : Joi.number().integer().positive().required()
            })
        ).min(1).required()
    }).required();

    //load config once>
    public static load(configPath = "./config.json") : void {
        if (this.config){
            return;
        }

        try{
            //resolve config path from prj root
            const fullPath = path.resolve(process.cwd(), configPath);
            //read file
            const raw = fs.readFileSync(fullPath, "utf-8");
            //parse json
            const parsed = JSON.parse(raw);
            //validate config
            const { error, value } = this.schema.validate(parsed, { 
                abortEarly : false,
                allowUnknown : false
            });

            if (error){
                throw new Error(`Config validation error: ${error.message}`);
            }
            //set config
            this.config = value;
        } catch (err) {
            console.error((err as Error).message);
            process.exit(1);
        }
    }

    //get config
    public static getConfig() : IConfig {
        if (!this.config) {
            throw new Error("Config not loaded. Call Config.load() first.");
        }
        return this.config;
    }
}