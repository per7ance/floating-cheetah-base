import ora from "ora";

import { prefix, isInDevelopment } from "../../config";
import { sync as findFiles } from "glob";
const patternPrefix = "./src/commands/";
const prefixToCut/*while getting the path to the module from this file*/ = "./src/commands";
const prefixToReplace/*replace prefixToCut with this*/ = ".";
const suffixToCut/*to create module name*/ = ".js";

import { EventEmitter } from "events";
export const commander = new EventEmitter();

commander.on('cmd', (cmd, args, ctx) => {
    /************************************************/
    // FOR DEVELOPMENT, WILL BE REMOVED IN PRODUCTION
    isInDevelopment ? ctx.channel.send(`Prefix: ${prefix}\nCommand: ${cmd}\nParameters: ${args.join(' ')}`) : null;
    isInDevelopment ? console.log(cmd, args, ctx.channel.id, ctx.author.id) : null;
    /************************************************/
    if (!commands[cmd]) return;
    const res = commands[cmd](args, ctx);
    ctx.channel.send(commands[cmd](args, ctx));
});

const commands = {};

export function loadup() {
    var resLoadup;
    var rejLoadup;
    const spinner = ora.promise(new Promise((res, rej) => {
        resLoadup = res;
        rejLoadup = rej;
    }), "Fetching commands...");

    const cmdModules = findFiles(`${patternPrefix}**/*.js`);
    cmdModules.forEach((filename) => {
        if (filename === `${patternPrefix}index.js`) return;
        const cmdName = filename.slice(patternPrefix.length).slice(0, -suffixToCut.length); // WARN: It can has slashes if it's in directory.
        spinner.text = `Loading command: ${cmdName}`;
        commands[cmdName] = require(filename.replace(prefixToCut, prefixToReplace)).default;
    });
    spinner.text = `Loaded ${cmdModules.length - 1} command(s)!`;
    resLoadup();
};

