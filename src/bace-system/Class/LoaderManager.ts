import { Guild, MessageAttachment, MessageEmbed, TextChannel } from "discord.js";
import axios from 'axios';
class KIGNAMNLOADER {
    private guild: Guild;
    constructor(ops: { guild: Guild }){
        this.guild = ops.guild;
    }
    async load_messages(channel: TextChannel, messages :[
        {
            id: string, type: number, content: string, channel_id: string, author: { id: string, username: string, avatar: string, discriminator: string , public_flags: string, avatar_decoration?: string }
            attachments: [any], embeds: [any], mentions: [any], mention_roles: [any], pinned: boolean, mention_everyone: boolean, tts: boolean, timestamp: string,  edited_timestamp?: string,
            flags: number, components: [any]
        }
    ]){
        const webhook = await channel.createWebhook("KINGMAN_BACKUPS");
        let new_messages_array = messages.filter(m=> m.content.length > 0 || m.embeds.length > 0 || m.attachments.length > 0 );
        for(const msg of new_messages_array){
            let attachments = []
            for(const data_object of msg.attachments){
                let data = await axios.get(data_object.proxy_url, {
                    responseType: "arraybuffer"
                });
                if(data){
                    let data_binnary = Buffer.from(data.data, "binary");
                    attachments.push(new MessageAttachment(data_binnary, data_object.filename))  
                }
            }
            const send_messages = await webhook.send({
                content: msg.content.length ? msg.content : undefined,
                username: msg.author.username,
                avatarURL: msg.author.avatar? `https://cdn.discordapp.com/avatars/639012924127707166/${msg.author.avatar}.jpg`: undefined,
                embeds: msg.embeds.map(data=> new MessageEmbed(data)),
                files: attachments
          }).catch(e=> {});
        }
    }
}
