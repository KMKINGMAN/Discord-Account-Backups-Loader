import { CommandFilerType } from "../../bace-system/handler/cmd";
const data = {
    general: {
        name: "list",
        description: "to show account's list",
        category: 'list',
        examples: ["list"],
        permissions: {
            bot: "ADMINISTRATOR",
            me: "ADMINISTRATOR"
        },
        usage: ["list"],
        run: async(client , kmsg, args, manager)=> {
            let data = client.accounts_dir.map(s=> `${s}\n`);
            return manager.sendDone(kmsg.channel, `You Have those account Backup's\n${data}`);
        }
    }
} as CommandFilerType
export default data;