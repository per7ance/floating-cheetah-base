import { author, prefix } from "../../config";
import { MessageEmbed } from "discord.js";

export function errorMessage(text, meta) {
    if (text.length > 2048) {
        throw new Error("Embed descriptions are limited to 2048 characters. More info: https://discordjs.guide/popular-topics/embeds.html#embed-limits");
    }
    return new MessageEmbed()
        .setColor('#FF0000')
        .setTitle(`Fail! (${meta.name})`)
        .setAuthor(author.name, author.pfpUrl, author.website)
        .setDescription(text)
        .addFields(
            { name: 'Usage', value: `${prefix}${meta.name} ${meta.usage}` },
            { name: 'Command Description', value: meta.description },
        )
        .setTimestamp()
        .setFooter('Powered with floating-cheetah-base');
}

export function successMessage(text, meta) {
    if (text.length > 2048) {
        throw new Error("Embed descriptions are limited to 2048 characters. More info: https://discordjs.guide/popular-topics/embeds.html#embed-limits");
    }
    return new MessageEmbed()
        .setColor('#09FF00')
        .setTitle(`Successful! (${meta.name})`)
        .setAuthor(author.name, author.pfpUrl, author.website)
        .setDescription(text)
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Command Description', value: meta.description },
        )
        .setTimestamp()
        .setFooter('Powered with floating-cheetah-base');
}

export function successListMessage(json, meta, isInline) {
    const titles = Object.keys(json);
    if (titles.length > 25) {
        throw new Error("There can be up to 25 fields. More info: https://discordjs.guide/popular-topics/embeds.html#embed-limits");
    }
    let embed = new MessageEmbed()
        .setColor('#09FF00')
        .setTitle(`Successful! (${meta.name})`)
        .setAuthor(author.name, author.pfpUrl, author.website)
        .setDescription(meta.description)
        .setTimestamp()
        .setFooter('Powered with floating-cheetah-base');
    titles.forEach((key, idx) => {
        if (key.length > 256) {
            throw new Error("A field's name is limited to 256 characters. More info: https://discordjs.guide/popular-topics/embeds.html#embed-limits");
        } else if (json[key].length > 1024) {
            throw new Error("A field's value is limited to 1024 characters. More info: https://discordjs.guide/popular-topics/embeds.html#embed-limits");
        }
        embed = embed.addField(key, json[key], isInline);
    });
    return embed;
}
