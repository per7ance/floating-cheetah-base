import secrets from "./secrets.json";
import settings from "./settings.json";

export const token = secrets.token;
export const prefix = settings.prefix;
export const author = settings.author;
export const isInDevelopment = settings.isInDevelopment;