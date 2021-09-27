import hooks from "./api/hooks";
import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();

hooks()
    .hook('redeployment', () => exec('scripts/redeploy.sh'))
    .token(process.env.WEBHOOK_TOKEN)
    .listen(process.env.LISTEN_PORT);
