import hooks from "./api/hooks";
import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();

hooks()
    .hook('redeployment', () =>
        exec(
            `scripts/redeploy.sh ${process.env.REGISTRY_TOKEN}`,
            (err, stdout, stderr) => {
                if (err !== null) console.error('error', err);
                if (stdout !== undefined) console.log('stdout', stdout);
                if (stderr !== undefined) console.log('stderr', stderr);
            })
        )
    .token(process.env.WEBHOOK_TOKEN)
    .listen(process.env.LISTEN_PORT);
