import { createServer } from "http";
import { parseJson, readBody } from "./http";

const setupServer = (hookObj: any) => {
    createServer()
        .on('request', async (req, res) => {
            res.end();

            const data = await readBody(req);
            const [ parseErr, body ] = parseJson(data);

            if (parseErr !== undefined) return;

            const actToken = hookObj.verificationToken;
            const reqToken = body?.auth?.token;
            const name = body?.hook?.name;

            if (actToken !== reqToken) return;

            hookObj.hooks.get(name)?.();
        })
        .listen(hookObj.port);
};

export default () => ({
    hooks: new Map<string, () => void>(),
    verificationToken: undefined,
    port: undefined,
    hook: function (name: string, invoke: () => void) {
        this.hooks.set(name, invoke);
        return this;
    },
    token: function (token: string) {
        this.verificationToken = token;
        return this;
    },
    listen: function (port: number) {
        this.port = port;
        setupServer(this);
        console.log(`Listening on port ${port}...`);
        return this;
    },
});
