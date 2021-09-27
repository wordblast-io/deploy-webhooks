import { IncomingMessage } from "http";

export const readBody = (req: IncomingMessage): Promise<string> => {
    const chunks = [];
    req.on('data', (chunk: string) => chunks.push(chunk));
    return new Promise((res) => req.on('end', () => res(chunks.join(''))));
};

export const parseJson = (data: string): [ Error, any ] => {
    try {
        return [ undefined, JSON.parse(data) ];
    } catch (err) {
        return [ err, undefined ];
    }
};
