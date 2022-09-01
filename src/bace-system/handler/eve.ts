import { readdirSync } from "fs";
import { ClientEvents } from "discord.js";
import KINGMAN_CLIENT from "../KMCodes";
interface EventsTyper {
    name: keyof ClientEvents,
    run: (client: KINGMAN_CLIENT, ...args: any[]) => void
}
let EVENTS_FUNCTION = (client : KINGMAN_CLIENT): void =>{
    readdirSync("./src/Events").forEach(folder=>{
        readdirSync(`./src/Events/${folder}`).filter(f=> f.endsWith(".ts")).forEach(async(file)=>{
            let event = (await import(`../../Events/${folder}/${file}`)).default as EventsTyper;
            if(event.name){
                client.on(event.name, async(...args)=> event.run(client, ...args))
            }
        })
    })
}
export default EVENTS_FUNCTION;
export { EVENTS_FUNCTION, EventsTyper }