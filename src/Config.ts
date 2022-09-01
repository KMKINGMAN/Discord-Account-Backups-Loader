import { config } from "dotenv"
config();
const data = {
    token: process.env.token ?? "",
    prefix: process.env.prefix ?? "",
    db: process.env.db ?? ""
}
export {
    data as ConfigData
}
export default data;