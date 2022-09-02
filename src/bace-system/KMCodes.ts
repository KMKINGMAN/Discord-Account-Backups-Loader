import { Client, ClientOptions, Collection } from 'discord.js';
import { ConfigData } from '../Config';
import pkgs from './Utils/pkgs';
import fs from "fs";
class KINGMAN_CLIENT extends Client {
    public command : Collection<String, any>;
    public slachcmd : Collection<String, any>;
    public aliacis : Collection<String, any>;
    public packages: typeof pkgs;
    public config : typeof ConfigData;
    public accounts_dir : Array<string | null>;
    public client_backup_dir: string | undefined
    constructor(ops: ClientOptions, dir?: string){
        super(ops);
        this.command = new Collection();
        this.slachcmd = new Collection();
        this.aliacis = new Collection();
        this.packages = pkgs;
        this.config = ConfigData;
        this.client_backup_dir = dir;
        //////// LOAD OUR HANDLER ////////
        ["cmd.ts", "eve.ts"].forEach(async(str)=> {
            (await import(`./handler/${str}`)).default(this)
        });
        this.accounts_dir = [];
        if(dir){
            this.accounts_dir = this.generateBackupDir(dir);
        }
    };
    generateBackupDir(location: string){
        if(!fs.existsSync(location)){
            return []
        };
        return fs.readdirSync(location)
    }
}
export { 
    KINGMAN_CLIENT
}
export default KINGMAN_CLIENT;