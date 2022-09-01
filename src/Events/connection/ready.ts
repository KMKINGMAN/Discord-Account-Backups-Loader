import { EventsTyper } from './../../bace-system/handler/eve';
let data = {
    name: "ready",
    run: async(client)=> {
        console.log(client.packages.chalk.red(client.packages.figlet.textSync("KINMGNA")))
        console.log(client.packages.chalk.bgGreen.black(`${client.user?.username} [Active]`))
    }
} as EventsTyper
export default data;