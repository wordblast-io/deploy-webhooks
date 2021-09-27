import hooks from "./api/hooks";
import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();

hooks()
    .hook('redeployment', () =>
        exec(
            `scripts/redeploy.sh ${process.env.REGISTRY_TOKEN}`,
            (err, stdout, stderr) => {
                if (err !== undefined) {
                    console.error('error', err);
                    return;
                }
                console.log('stdout', stdout);
                console.log('stderr', stderr);
            })
        )
    .token(process.env.WEBHOOK_TOKEN)
    .listen(process.env.LISTEN_PORT);
