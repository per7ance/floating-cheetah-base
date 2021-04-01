import { errorMessage, successListMessage, successMessage } from "../modules/cmdResponses";
const cmdMetaInfo = {
    name: "example",
    description: "Show all the info that comes to bot.",
    usage: "" // prefix and cmd are added automatically when using cmdResponses module
};

export default function(args, ctx) {
    if (args.length == 1) {
        return successMessage(`I got "${args[0]}" from <@${ctx.author.id}> in <#${ctx.channel.id}>`, cmdMetaInfo);
    } else if (args.length > 0) {
        return successListMessage({
            "Command Name": cmdMetaInfo.name,
            "Parameters": args.join(','),
            "Message Channel ID": ctx.channel.id.toString(),
            "Message Author ID": ctx.author.id.toString(),
        }, cmdMetaInfo, false/*isInline: can items be side by side or will it be line by line*/);
    } else {
        return errorMessage("No paramters are defined, this is an example of an error message.", cmdMetaInfo);
    }
};
