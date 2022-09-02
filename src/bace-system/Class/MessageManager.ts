import { GuildBasedChannel, DMChannel , PartialDMChannel , NewsChannel , TextChannel , ThreadChannel, Message, MessageEmbed, User, GuildMember, Channel, Role, VoiceChannel } from "discord.js";
class KINGMAN_MESSAGE_MANAGER {
    public message: Message
    constructor(message: Message){
        this.message = message
    }
    async sendDone(channel: DMChannel | VoiceChannel | PartialDMChannel | NewsChannel | TextChannel | ThreadChannel, content: string | any, title?: string){
        return channel.send({
            embeds: [ new MessageEmbed({
                title: `${title? title : `**✔️ Succeed**`}`,
                author: {
                    name: `${this.message.author.username}`
                },
                description: `**${content}**`,
                footer: {
                    text: `${channel.client.user?.username} Power By KMCodes`
                },
                color: `#ffaa00`
            }) ]
        })
    }
    async SendError(channel: DMChannel | VoiceChannel |  PartialDMChannel | NewsChannel | TextChannel | ThreadChannel, content: string){
        return channel.send({
            embeds: [ 
                new MessageEmbed({
                    title: `**⚠️ Error**`,
                    description: `**${content}**`,
                    footer: {
                        text: `${channel.client.user?.username} Power By KMCodes`
                    },
                    color: `#f5210a`
                })
             ]
        })
    }
    async getUser(id: any): Promise<User>{
        return new Promise(async(res, rej)=> {
            let user = await this.message.mentions.members?.first() || 
            await this.message.guild?.members.cache.get(id) ||
            await this.message.guild?.members.cache.find(m => m.displayName.toLowerCase() == id.toLowerCase())
            if(!user){
                rej({
                    message: `i can't find this user `
                })
            } else {
                res(user.user)
            }
        })
    }
    async getMemeber(id: any): Promise<GuildMember> {
        return new Promise(async(res, rej)=> {
            let member = await this.message.mentions.members?.first() || 
            await this.message.guild?.members.cache.get(id) ||
            await this.message.guild?.members.cache.find(m => m.displayName.toLowerCase() == id.toLowerCase())
            if(!member){
                rej({
                    message: `i can't find this member`
                })
            } else {
                res(member)
            }
        })
    }
    async getChannel(id: any): Promise< DMChannel | PartialDMChannel | GuildBasedChannel >{
        return new Promise(async (res, rej) =>{
            let channel = await this.message.mentions.channels.first() ||
            await this.message.guild?.channels.cache.get(id) ||
            await this.message.guild?.channels.cache.find((c) => c.name == id);
            if(!channel){
                rej({
                    message: `i can't find the channel`
                })
            } else {
                res(channel)
            }
        })
    }
    async getRole(id: any): Promise<Role> {
        return new Promise(async (res, rej)=> {
            let role = await this.message.mentions.roles.first() ||
            await this.message.guild?.roles.cache.get(id) ||
            await this.message.guild?.roles.cache.find(role=> role.name === id)
            if(!role){
                return rej({
                    message: `i can't find this role`
                })
            }
            if(role.managed || role.name === '@everyone'){
                return rej({
                    message: `i can't find this role`
                })
            } else {
                return res(role)
            }
        })
    }
}
export {
    KINGMAN_MESSAGE_MANAGER as MessageManager
}