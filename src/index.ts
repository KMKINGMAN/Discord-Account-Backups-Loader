import Client from "./bace-system/KMCodes";
const client = new Client({
    intents: 98303, 
    partials: ["CHANNEL", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT", "MESSAGE", "REACTION", "USER"] 
});
client.login(client.config.token);