import { ApplicationCommandOptionData, CommandInteraction, Message, PermissionFlags } from "discord.js";
import { readdirSync } from "fs";
import { MessageManager } from "../Class/MessageManager";
import KINGMAN_CLIENT from "../KMCodes";
interface CommandFilerType { 
    general?: {
        name: String,
        permissions? :{
            me: keyof PermissionFlags,
            bot: keyof PermissionFlags
        },
        description?: String,
        examples?: Array<String>,
        usage?: Array<String>,
        category? : String,
        run: (client: KINGMAN_CLIENT, message: Message, args: Array<string>, manager: MessageManager)=> void
    },
    slachcmd?: {
        name: String,
        permissions? :{
            me: keyof PermissionFlags,
            bot: keyof PermissionFlags
        },
        description: String,
        examples?: Array<String>,
        usage?: Array<String>,
        category? : String,
        options? : Array<ApplicationCommandOptionData>,
        run: (client: KINGMAN_CLIENT, interaction: CommandInteraction)=> void
    }
}
const COMMAND_FUNCTION = (client: KINGMAN_CLIENT): void => {
    let SlachCommandData : Array<any> = [];
    readdirSync("./src/Commands").forEach(async(folder)=> {
        readdirSync(`./src/Commands/${folder}`).filter(f => f.endsWith(".ts")).forEach(async(file)=> {
            let command = (await import(`../../Commands/${folder}/${file}`)).default as CommandFilerType;
            if(command.general){
                client.command.set(command.general.name, command.general)
            }
            if(command.slachcmd){
                client.slachcmd.set(command.slachcmd.name, command.slachcmd)
                SlachCommandData.push(command.slachcmd)
            }
        })
    });
    client.on("guildCreate", async(guild)=>{
        SlachCommandData.forEach(async(command)=> {
            await guild.commands.create(command).catch(e=> { console.log(e.message )});
        })
    });
    client.on("ready", async()=>{
        client.guilds.cache.forEach(async(guild)=> {
            SlachCommandData.forEach(async(command)=> {
                await guild.commands.create(command).catch(e=> { console.log(e.message )});
            })
        })
    })
}
export default COMMAND_FUNCTION;
export { CommandFilerType, COMMAND_FUNCTION }