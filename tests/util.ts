import {Client, IClient} from "../src/Client";
import path from "path";
import fs from "fs";
import { IClientOptions } from "../src/interfaces/common";
import {TConstructor} from "../src/types";

export function connect<T extends IClient>(client: T): T {
    const file = path.resolve(__dirname, './token.json');

    if (!client.environment.get('auth.code', false)) {
        const json = fs.readFileSync(file).toString();
        const data = JSON.parse(json);
        client.token.setValue(data);
    }

    client.token.on('change', () => {
        const token = client.token.getValue();
        const data = JSON.stringify(token);
        fs.writeFileSync(file, data);
    });
    return client;
}