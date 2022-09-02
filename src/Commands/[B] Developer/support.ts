import { CommandFilerType } from "../../bace-system/handler/cmd";
const data = {
    general: {
        name: "support",
        description: "to get help and contact to the developer",
        category: 'support',
        examples: ["support"],
        usage: ["support"],
        run: async(client , kmsg, args, manager)=> {
            return manager.sendDone(kmsg.channel, "join my discord server\nhttps://discord.gg/kmcodes\nDonate: paypal.me/kmcodes", "Support");
        }
    }
} as CommandFilerType
export default data;