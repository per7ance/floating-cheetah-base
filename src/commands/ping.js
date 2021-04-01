import { successMessage } from "../modules/cmdResponses";
const cmdMetaInfo = {
    name: "ping",
    description: "Ask bot if it feels good.",
    usage: "" // prefix and cmd are added automatically when using cmdResponses module
};

export default function(_args, _ctx) {
    return successMessage("Thank's for asking, I'm OK!", cmdMetaInfo);
};
