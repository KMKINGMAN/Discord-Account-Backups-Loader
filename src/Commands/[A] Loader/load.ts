import fs from "fs";
import { AccountBackupLoader } from "../../bace-system/Class/LoaderManager";
import { CommandFilerType } from "../../bace-system/handler/cmd";
const data = {
    general: {
        name: "load",
        description: "to load index backup",
        category: 'load',
        examples: ["load Muhammad"],
        permissions: {
            bot: "ADMINISTRATOR",
            me: "ADMINISTRATOR"
        },
        usage: ["load <dir name>"],
        run: async(client , kmsg, args, manager)=> {
            if(!args[0]){
                return await manager.SendError(kmsg.channel, "missing <Backup Dir Name>")
            }
            let dir = args.join(" ");
            if(!kmsg.guild) return;
            let mainlocation = ""
            if(client.client_backup_dir){
                mainlocation = client.client_backup_dir.endsWith("/") ? client.client_backup_dir.slice(0 , -1) : client.client_backup_dir; ;
                if(!client.accounts_dir.includes(dir)){
                    return await manager.SendError(kmsg.channel, "Invaild <Backup Dir>")
                };
                if(!fs.existsSync(`${mainlocation}/${dir}/messages`)){
                    return await manager.SendError(kmsg.channel, "Invaild <Backup Dir>")
                };
                let file;
                try {
                    file = fs.readFileSync(`${mainlocation}/${dir}/messages/index.json`, { "encoding": "utf-8" });
                } catch (error) {
                    file = undefined;
                }
                if(!file){
                    return await manager.SendError(kmsg.channel, "Missing index.json File from <Backup Dir> ")
                }
                try {
                    let data = JSON.parse(file);
                    let backup = new AccountBackupLoader({ guild: kmsg.guild });
                    await manager.sendDone(kmsg.channel, "The process will start now")
                    await backup.load_index_file(data);   
                } catch (error) {
                    return await manager.SendError(kmsg.channel, "Invaild File Data in index.json")
                }
            }
        }
    }
} as CommandFilerType
export default data;