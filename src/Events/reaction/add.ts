import { Message, MessageReaction, PartialMessageReaction, User, PartialUser} from 'discord.js';
import { MessageManager } from '../../bace-system/Class/MessageManager';
import { $KM_REACTION } from '../../bace-system/Class/ReactionRoleManager';
import { EventsTyper } from './../../bace-system/handler/eve';
let data = {
    name: "messageReactionAdd",
    run: async(client, react: MessageReaction | PartialMessageReaction, user: User | PartialUser)=> {
        if(user.partial) await user.fetch();
        if(react.partial) await react.fetch();
        if(react.message.partial) await react.message.fetch();
        if(user.bot) return;
        if(!react.message.guild) return;
        let KINGMAN = new $KM_REACTION(react.message.guild);
        await KINGMAN.eventsAdd(react, user);
    }
} as EventsTyper
export default data;
