import { Message } from 'discord.js';
import { MessageManager } from '../../bace-system/Class/MessageManager';
import { EventsTyper } from './../../bace-system/handler/eve';
let data = {
    name: "messageCreate",
    run: async(client, kmsg: Message)=> {
        let pmention = new RegExp(`^<@!?${client.user?.id}>( |)$`); 
        if (kmsg.content.match(pmention)) {
            return kmsg.reply(`**MY PREFIX IS: ${client.config.prefix}**`)
        }
        if (kmsg.author.bot) return;
        if (!kmsg.guild) {
            return kmsg.reply("**ONLY WORK ON SERVERS NOT DM**")
        }
        if (!kmsg.content.startsWith(client.config.prefix)) return;
        let args: Array<any> = kmsg.content.slice(client.config.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        if(command.length === 0) return;
        let data = client.command.get(command);
        if(data){
            try {
                if(!kmsg.member?.permissions.has(data.permissions?.me || [])){
                  return kmsg.reply(`You need \`${data.permissions?.me}\` permissions`)
                }
                if(!kmsg.guild.me?.permissions.has(data.permissions?.bot || [])){
                  return kmsg.reply(`I need \`${data.permissions?.bot}\` permissions`)
                }
                let manager = new MessageManager(kmsg);
                data.run(client, kmsg, args, manager);
              } catch (err: any) {
                return console.log(err.message)
              }
        }
    }
} as EventsTyper
export default data;
