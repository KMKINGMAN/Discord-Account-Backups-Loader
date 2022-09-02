import fs from "fs";
import Client from "./bace-system/KMCodes";
//ClientOPS , BackupFile Dir
const client = new Client({
    intents: 98303, 
    partials: ["CHANNEL", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT", "MESSAGE", "REACTION", "USER"] 
}, "./backups");
client.login(client.config.token);
