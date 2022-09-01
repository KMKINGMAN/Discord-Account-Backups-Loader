import { Client, ClientOptions, Collection } from 'discord.js';
import { ConfigData } from '../Config';
import pkgs from './Utils/pkgs';
class KINGMAN_CLIENT extends Client {
    public command : Collection<String, any>;
    public slachcmd : Collection<String, any>;
    public aliacis : Collection<String, any>;
    public packages: typeof pkgs;
    public config : typeof ConfigData;
    constructor(ops: ClientOptions){
        super(ops);
        this.command = new Collection();
        this.slachcmd = new Collection();
        this.aliacis = new Collection();
        this.packages = pkgs;
        this.config = ConfigData;
        //////// LOAD OUR HANDLER ////////
        ["cmd.ts", "eve.ts"].forEach(async(str)=> {
            (await import(`./handler/${str}`)).default(this)
        })
    }
}
export { 
    KINGMAN_CLIENT
}
export default KINGMAN_CLIENT;