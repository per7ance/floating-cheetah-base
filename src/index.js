import ora from "ora";

import { Client as DClient } from "discord.js";
import { token, prefix } from "../config";
import { loadup as cmdLoadup, commander } from "./commands";

var resLogin;
var rejLogin;
const spinner = ora.promise(new Promise((res, rej) => {
    resLogin = res;
    rejLogin = rej; 
}), "Logging in...");

const dclient = new DClient();

dclient.once('ready', () => {
    resLogin();
    spinner.text = `Logged in as "${dclient.user.tag}"`;
});

dclient.on('message', (msg) => {
    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (!command) return;

    const ctx = {
        author: msg.author,
        channel: msg.channel,
    };

    commander.emit('cmd', command, args, ctx);
    msg.delete();
});

cmdLoadup();

dclient.login(token);
